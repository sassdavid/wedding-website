import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Card from '@/components/Card';
import CryptoJS from 'crypto-js';
import ErrorMessage from '@/cards/ErrorMessage';

const Rsvp = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    attending: '',
    alone: '',
    guests: 1,
    dinner: '',
    shottype: '',
    passphrase: '',
    message: '',
    guestDetails: [{ name: '', isAdult: 'yes' }],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const secretHash: string = '13df49eeb1f666dbdc7242d3137a327ce9ff84b8d9a348d20e1c67eae4befb9cb86e4af0722c0ce61c37dc550c1fa9bec92a665af4d42dcdd3bab582c2c76e0a';
  const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const phonenumberRegex: RegExp = /^(\+?(36|49)[ -]?)?(\(?\d{1,3}\)?[ -]?)?(\d[ -]?){6,10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ( name === 'guests' ) {
      const newGuestCount: number = parseInt(value, 10);
      const newGuestDetails = new Array(newGuestCount).fill(null).map((_, index: number) => {
        return formData.guestDetails[index] || { name: '', isAdult: 'yes' };
      });
      setFormData({ ...formData, [name]: value, guestDetails: newGuestDetails });
    } else if ( name.startsWith('guestName') || name.startsWith('guestIsAdult') ) {
      const index: number = parseInt(name.split('-')[1], 10);
      const updatedGuestDetails = [...formData.guestDetails];
      if ( name.startsWith('guestName') ) {
        updatedGuestDetails[index].name = value;
      } else {
        updatedGuestDetails[index].isAdult = value;
      }
      setFormData({ ...formData, guestDetails: updatedGuestDetails });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    let newErrors: {} = {};

    if ( !formData.name ) {
      newErrors['name'] = 'A név kitöltése kötelező!';
    }

    if ( formData.phonenumber && !phonenumberRegex.test(formData.phonenumber) ) {
      newErrors['phonenumber'] = 'A telefonszám nem megfelelő!';
    }

    if ( !formData.email ) {
      newErrors['email'] = 'Az email cim kitöltése kötelező!';
    } else if ( !emailRegex.test(formData.email) ) {
      newErrors['email'] = 'Az email cím nem megfelelő!';
    }

    if ( !formData.attending ) {
      newErrors['attending'] = 'Kérlek jelöld, hogy részt veszel-e az esküvőn!';
    }

    if ( formData.attending === 'yes' && !formData.dinner ) {
      newErrors['dinner'] = 'Kérlek jelöld, hogy részt veszel-e a vacsorán!';
    }

    if ( formData.attending === 'yes' && !formData.alone ) {
      newErrors['alone'] = 'Kérlek jelöld, hogy egyedül jössz-e!';
    }

    if ( formData.attending === 'yes' && formData.alone === 'no' ) {
      formData.guestDetails.forEach((guest: { name: string; isAdult: string }, index: number): void => {
        if ( !guest.name ) {
          newErrors[`guestName-${index}`] = `A(z) ${index + 1}. vendég nevének megadása kötelező!`;
        }
      });
    }

    const hashedPassphrase: string = CryptoJS.SHA3(formData.passphrase, { outputLength: 512 }).toString();
    if ( hashedPassphrase !== secretHash ) {
      newErrors['passphrase'] = 'Hibás jelszó!';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !validateForm() ) return;

    const translations = {
      'yes': 'igen',
      'no': 'nem',
    };

    if ( !formData.alone || formData.alone === 'yes' ) {
      formData.guests = 0;
    }

    const { passphrase, guestDetails, ...dataWithoutPassphraseAndGuestDetails } = formData;

    const dataForUrlSearch = Object.keys(dataWithoutPassphraseAndGuestDetails).reduce((acc, key) => {
      let value = dataWithoutPassphraseAndGuestDetails[key];
      if ( value !== null && value !== undefined && value !== '' ) {
        if ( ['attending', 'alone', 'dinner'].includes(key) ) {
          value = translations[value] || value;
        }
        acc[key] = String(value);
      }
      return acc;
    }, {});

    if ( formData.attending === 'yes' && formData.alone === 'no' && guestDetails ) {
      const guestDetailsString = guestDetails
        .map(guest => `${guest.name}, ${guest.isAdult === 'yes' ? 'Felnőtt' : 'Gyerek'}`)
        .join('; ');

      if ( guestDetailsString ) {
        dataForUrlSearch['guestDetails'] = guestDetailsString;
      }
    }

    const queryParams = new URLSearchParams(dataForUrlSearch).toString();

    try {
      setIsLoading(true);

      const responseServer: Response = await fetch(`https://script.google.com/macros/s/AKfycby7gqxNKz29OugpZxC4Ol_KsI9a3qio7OJHlY4LzovVdkjTbRBxJOR5_hBzGTb--T1d/exec?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
      });

      const response = await responseServer.json();

      if ( response.result === 'success' ) {
        // noinspection ES6MissingAwait
        navigate('/thanks', { state: { fillerName: formData.name } });
      } else if ( response.result === 'duplicate' ) {
        // noinspection ES6MissingAwait
        navigate('/thanks', { state: { fillerName: formData.name, fillerEmail: formData.email } });
      } else {
        console.error('Form submission error');
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormAndErrors = (): void => {
    setFormData({
      name: '',
      phonenumber: '',
      email: '',
      attending: '',
      alone: '',
      guests: 1,
      dinner: '',
      shottype: '',
      passphrase: '',
      message: '',
      guestDetails: [{ name: '', isAdult: 'yes' }],
    });
    setErrors({});
  };

  const handleCloseArticle = (): void => {
    setFormData({
      name: '',
      phonenumber: '',
      email: '',
      attending: '',
      alone: '',
      guests: 1,
      dinner: '',
      shottype: '',
      passphrase: '',
      message: '',
      guestDetails: [{ name: '', isAdult: 'yes' }],
    });
    setErrors({});

    props.onCloseArticle();
  };

  const renderGuestDetailsInputs = () => {
    return formData.guestDetails.map((guest: { name: string; isAdult: string }, index: number) => (
      <div key={index}>
        <div className="field half first">
          <label htmlFor={`guestName-${index}`}>{index + 1}. plusz vendég neve</label>
          <input type="text" name={`guestName-${index}`} id={`guestName-${index}`} value={guest.name} onChange={handleChange} required />
          <ErrorMessage message={errors[`guestName-${index}`]} />
        </div>
        <div className="field half">
          <label htmlFor={`guestIsAdult-${index}`}>Idősebb, mint 10 év?</label>
          <select name={`guestIsAdult-${index}`} id={`guestIsAdult-${index}`} value={guest.isAdult} onChange={handleChange} required>
            <option value="yes">Igen</option>
            <option value="no">Nem</option>
          </select>
          <ErrorMessage />
        </div>
      </div>
    ));
  };

  return (
    <Card id="rsvp" style={props.style} onCloseArticle={handleCloseArticle} articleClassName={props.articleClassName}>
      <div>
        <h2 className="major">Visszajelzés</h2>
        {isLoading && (
          <div className="full-screen-loader">
          <div className="loader"></div>
            </div>
        )}
        <form className="rsvp-form" onSubmit={handleSubmit} name="rsvp" noValidate>
          <div className="field">
            <input type="text" name="username" id="username" required readOnly={true} value="KnownUsername" style={{ display: 'none' }} />
          </div>
          <div className="field">
            <label htmlFor="passphrase">Jelszó (QR kód alatt találod)</label>
            <input type="password" name="passphrase" id="passphrase" value={formData.passphrase} onChange={handleChange} required
                   autoComplete="current-password" />
            <ErrorMessage message={errors['passphrase']} />
          </div>
          <div className="field half first">
            <label htmlFor="name">Név</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
            <ErrorMessage message={errors['name']} />
          </div>
          <div className="field half">
            <label htmlFor="phonenumber">Telefonszám</label>
            <input type="text" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
            <ErrorMessage message={errors['phonenumber']} />
          </div>
          <div className="field half first">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} required autoComplete="username" />
            <ErrorMessage message={errors['email']} />
          </div>
          <div className="field half">
            <label htmlFor="attending">Részt veszel az esküvőn?</label>
            <select name="attending" id="attending" value={formData.attending} onChange={handleChange} required>
              <option value="">Kérjük válassz egy opciót!</option>
              <option value="yes">Naná, ott a helyem!</option>
              <option value="no">Sajnos nem tudok részt venni.</option>
            </select>
            <ErrorMessage message={errors['attending']} />
          </div>
          {formData.attending === 'yes' && (
            <React.Fragment>
              <div className="field half first">
                <label htmlFor="alone">Egyedül érkezel?</label>
                <select name="alone" id="alone" value={formData.alone} onChange={handleChange} required>
                  <option value="">Kérjük válassz egy opciót!</option>
                  <option value="yes">Igen</option>
                  <option value="no">Nem</option>
                </select>
                <ErrorMessage message={errors['alone']} />
              </div>
              {formData.alone === 'no' && (
                <React.Fragment>
                  <div className="field half">
                    <label htmlFor="guests">Plusz vendégek száma</label>
                    <select name="guests" id="guests" value={formData.guests} onChange={handleChange} required>
                      {[...Array(5).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                    <ErrorMessage />
                  </div>
                  {renderGuestDetailsInputs()}
                </React.Fragment>
              )}
              <div className={`field half ${formData.alone === 'no' ? 'first' : ''}`}>
                <label htmlFor="dinner">{formData.alone === 'no' ? 'Részt vesztek a vacsorán?' : 'Részt veszel a vacsorán?'}</label>
                <select name="dinner" id="dinner" value={formData.dinner} onChange={handleChange} required>
                  <option value="">Kérjük válassz egy opciót!</option>
                  <option value="yes">Igen</option>
                  <option value="no">Nem</option>
                </select>
                <ErrorMessage message={errors['dinner']} />
              </div>
              <div className={`field ${formData.alone === 'no' ? 'half' : ''}`}>
                <label htmlFor="shottype">Kedvenc rövidital(ok)</label>
                <input type="text" name="shottype" id="shottype" value={formData.shottype} onChange={handleChange} />
                <ErrorMessage message={errors['shottype']} />
              </div>
            </React.Fragment>
          )}
          <div className="field">
            <label id="messageLabel" htmlFor="messageTextarea">Bármilyen kérés/kérdés felénk</label>
            <textarea name="message" id="messageTextarea" rows="3" value={formData.message} onChange={handleChange}
                      placeholder="Például itt tudod megadni, hogy szükséged van-e vegetáriánus, vegán, vagy laktóz/gluténmentes ételre." />
          </div>
          <ul className="actions">
            <li>
              <input type="reset" value="Töröl" className="reset-button" onClick={resetFormAndErrors} />
            </li>
            <li>
              <input type="submit" value="Beküld" className="special" disabled={isLoading} />
            </li>
          </ul>
        </form>
      </div>
  </Card>
  );
};

Rsvp.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Rsvp;

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
  });
  const [errors, setErrors] = useState({});

  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if ( formRef.current && !formRef.current.contains(event.target) ) {
        resetFormAndErrors();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  const secretHash: string = '13df49eeb1f666dbdc7242d3137a327ce9ff84b8d9a348d20e1c67eae4befb9cb86e4af0722c0ce61c37dc550c1fa9bec92a665af4d42dcdd3bab582c2c76e0a';
  const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const phonenumberRegex: RegExp = /^(\+?(36|49)[ -]?)?(\(?\d{1,3}\)?[ -]?)?(\d[ -]?){6,10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if ( errors[name] ) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

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
      newErrors['attending'] = 'Kérjek jelöld, hogy részt veszel-e az eksüvőn!';
    }

    if ( formData.attending === 'yes' && !formData.dinner ) {
      newErrors['dinner'] = 'Kérjek jelöld, hogy részt veszel-e a vacsorán!';
    }

    if ( formData.attending === 'yes' && !formData.alone ) {
      newErrors['alone'] = 'Kérjek jelöld, hogy egyedül jössz-e!';
    }

    const hashedPassphrase = CryptoJS.SHA3(formData.passphrase, { outputLength: 512 }).toString();
    if ( hashedPassphrase !== secretHash ) {
      newErrors['passphrase'] = 'Hibás jelszó!';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !validateForm() ) return;

    const mappings = {
      alone: {
        'yes': 'Igen',
        'no': 'Nem',
      },
      attending: {
        'yes': 'Igen',
        'no': 'Nem',
      },
      dinner: {
        'yes': 'Igen',
        'no': 'Nem',
      },
    };

    formData.alone = mappings.alone[formData.alone];
    formData.attending = mappings.attending[formData.attending];
    formData.dinner = mappings.dinner[formData.dinner];

    if ( formData.alone === 'yes' ) {
      formData.guests = 0;
    }

    try {
      let body = JSON.stringify(formData);
      console.log(body);
      const response = { result: 'success' };

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
    }
  };

  const resetFormAndErrors = () => {
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
    });
    setErrors({});
  };

  const handleCloseArticle = () => {
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
    });
    setErrors({});

    props.onCloseArticle();
  };

  return (
    <Card id="rsvp" style={props.style} onCloseArticle={handleCloseArticle} articleClassName={props.articleClassName}>
      <div ref={formRef}>
        <h2 className="major">RSVP</h2>
        <form className="rsvp-form" onSubmit={handleSubmit} name="rsvp" noValidate>
          <div className="field">
            <label htmlFor="passphrase">Jelszó</label>
            <input type="text" name="passphrase" id="passphrase" value={formData.passphrase} onChange={handleChange} required />
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
            <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} required />
            <ErrorMessage message={errors['email']} />
          </div>
          <div className="field half">
            <label htmlFor="attending">Részt veszel az esküvőn?</label>
            <select name="attending" id="attending" value={formData.attending} onChange={handleChange} required>
              <option value="">Kérjük válassz egy opciót!</option>
              <option value="yes">Igen</option>
              <option value="no">Nem</option>
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
                <div className="field half">
                  <label htmlFor="guests">Plusz vendégek száma</label>
                  <select name="guests" id="guests" value={formData.guests} onChange={handleChange} required>
                    {[...Array(10).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                  <ErrorMessage />
                </div>
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
              <input type="submit" value="Beküld" className="special" />
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

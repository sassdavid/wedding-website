import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Card from '@/components/Card';
import CryptoJS from 'crypto-js';
import ErrorMessage from '@/cards/ErrorMessage';

const Rsvp = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    shottype: '',
    attending: '',
    guests: 1,
    passphrase: '',
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
      newErrors['name'] = 'A név kitöltése kötelező.';
    }

    if ( formData.phonenumber && !phonenumberRegex.test(formData.phonenumber) ) {
      newErrors['phonenumber'] = 'Telefonszám nem megfelelő.';
    }

    if ( !formData.email ) {
      newErrors['email'] = 'Az email kitöltése kötelező.';
    } else if ( !emailRegex.test(formData.email) ) {
      newErrors['email'] = 'Email cím nem megfelelő.';
    }

    if ( !formData.attending ) {
      newErrors['attending'] = 'Kérjek jelöld, hogy részt veszel-e az eksüvőn.';
    }

    const hashedPassphrase = CryptoJS.SHA3(formData.passphrase, { outputLength: 512 }).toString();
    if ( hashedPassphrase !== secretHash ) {
      newErrors['passphrase'] = 'Hibás jelszó.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !validateForm() ) return;

    try {
      let body = JSON.stringify(formData);
      console.log(body);
      const response = { ok: 'true' };
      if ( response.ok ) {
        // noinspection ES6MissingAwait
        navigate('/thanks');
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
      email: '',
      phonenumber: '',
      shottype: '',
      attending: '',
      guests: 1,
      passphrase: '',
    });
    setErrors({});
  };

  const handleCloseArticle = () => {
    setFormData({
      name: '',
      email: '',
      phonenumber: '',
      shottype: '',
      attending: '',
      guests: 1,
      passphrase: '',
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
            <label htmlFor="passphrase">Meghívási kulcs</label>
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
            <label htmlFor="shottype">Kedvenc rövidital</label>
            <input type="text" name="shottype" id="shottype" value={formData.shottype} onChange={handleChange} />
            <ErrorMessage message={errors['shottype']} />
          </div>
          <div className="field half first">
            <label htmlFor="attending">Részt veszel az esküvőn?</label>
            <select name="attending" id="attending" value={formData.attending} onChange={handleChange} required>
              <option value="">Kérjük válassz egy opciót!</option>
              <option value="yes">Igen</option>
              <option value="no">Nem</option>
            </select>
            <ErrorMessage message={errors['attending']} />
          </div>
          <div className="field half">
            <label htmlFor="guests">Plusz vendégek száma</label>
            <select name="guests" id="guests" value={formData.guests} onChange={handleChange} required>
              {[...Array(10).keys()].map(num => (
                <option key={num} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
          <ul className="actions">
            <li>
              <input type="reset" value="Reset" className="reset-button" onClick={resetFormAndErrors} />
            </li>
            <li>
              <input type="submit" value="Send RSVP" className="special" />
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

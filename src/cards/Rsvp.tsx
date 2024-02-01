import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Card from '@/components/Card';

const Rsvp = (props) => {
  const [formData, setFormData] = useState({
                                             name: '',
                                             email: '',
                                             attending: '',
                                             guests: 1,
                                           });
  const [errors, setErrors] = useState({});

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
      newErrors['name'] = 'Name is required.';
    }
    if ( !formData.email ) {
      newErrors['email'] = 'Email is required.';
    } else if ( !/\S+@\S+\.\S+/.test(formData.email) ) {
      newErrors['email'] = 'Email is invalid.';
    }
    if ( !formData.attending ) {
      newErrors['attending'] = 'Please indicate if you will be attending.';
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
        console.log('Form submitted successfully');
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
                  attending: '',
                  guests: 1,
                });
    setErrors({});
  };

  const handleCloseArticle = () => {
    setFormData({
                  name: '',
                  email: '',
                  attending: '',
                  guests: 1,
                });
    setErrors({});

    props.onCloseArticle();
  };

  return (
    <Card id="rsvp" style={props.style} onCloseArticle={handleCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">RSVP Form</h2>
    <form className="rsvp-form" onSubmit={handleSubmit} name="rsvp" noValidate>
      <div className="field half first">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
        {errors['name'] && <p className="error">{errors['name']}</p>}
      </div>
      <div className="field half">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        {errors['email'] && <p className="error">{errors['email']}</p>}
      </div>
      <div className="field half first">
        <label htmlFor="attending">Will you be attending?</label>
        <select name="attending" id="attending" value={formData.attending} onChange={handleChange} required>
          <option value="">--Please choose an option--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {errors['attending'] && <p className="error">{errors['attending']}</p>}
      </div>
      <div className="field half">
        <label htmlFor="guests">Number of Guests</label>
        <select
          name="guests"
          id="guests"
          value={formData.guests}
          onChange={handleChange}
          required>
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
  </Card>
  );
};

Rsvp.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Rsvp;

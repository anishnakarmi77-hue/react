import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  address: '',
  city: '',
  gender: '',
}

const Register = () => {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const errs = {}
    if (!formData.fullname.trim()) errs.fullname = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Enter a valid email'
    if (formData.phone.trim().length < 7) errs.phone = 'Enter a valid phone number'
    if (formData.password.length < 6) errs.password = 'At least 6 characters'
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords don\'t match'
    if (!formData.city) errs.city = 'Please pick a city'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push(formData)
    localStorage.setItem('users', JSON.stringify(users))

    Swal.fire({
      title: 'Welcome aboard! 🎉',
      text: 'Your account has been created.',
      icon: 'success',
      confirmButtonText: 'Start shopping',
    }).then(() => navigate('/products'))

    setFormData(initialForm)
  }

  const field = (name) => errors[name] ? 'has-error' : ''

  return (
    <section className="container register-page">
      <div className="register-card">
        <div className="register-side">
          <span className="pill pill-peach">Join the fun ✨</span>
          <h1>Create your account</h1>
          <p>Get faster checkout, order tracking and first dibs on new drops.</p>
          <div className="side-emoji">🎈🧁🎁</div>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row two-col">
            <div className={`field ${field('fullname')}`}>
              <label>Full Name</label>
              <input type="text" name="fullname" placeholder="Jane Doe" value={formData.fullname} onChange={handleChange} />
              {errors.fullname && <span className="err">{errors.fullname}</span>}
            </div>
            <div className={`field ${field('phone')}`}>
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="98XXXXXXXX" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>
          </div>

          <div className={`field ${field('email')}`}>
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="err">{errors.email}</span>}
          </div>

          <div className="form-row two-col">
            <div className={`field ${field('password')}`}>
              <label>Password</label>
              <input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} />
              {errors.password && <span className="err">{errors.password}</span>}
            </div>
            <div className={`field ${field('confirmPassword')}`}>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="err">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="field">
            <label>Gender</label>
            <div className="gender-options">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className={`gender-pill ${formData.gender === g ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Address</label>
            <textarea name="address" placeholder="Street, area…" rows="2" value={formData.address} onChange={handleChange} />
          </div>

          <div className={`field ${field('city')}`}>
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              <option>Kathmandu</option>
              <option>Lalitpur</option>
              <option>Bhaktapur</option>
              <option>Pokhara</option>
              <option>Biratnagar</option>
              <option>Chitwan</option>
            </select>
            {errors.city && <span className="err">{errors.city}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          <p className="login-hint">Already have an account? <a href="#">Log in</a></p>
        </form>
      </div>

      <style>{`
        .register-page { padding: 50px 24px 70px; }
        .register-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          overflow: hidden;
          max-width: 920px;
          margin: 0 auto;
        }
        .register-side {
          background: linear-gradient(160deg, #FFDCE3, #F1ECFF);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .register-side h1 { font-size: 1.7rem; margin: 14px 0 10px; }
        .register-side p { color: var(--color-text); opacity: 0.75; }
        .side-emoji { font-size: 2rem; margin-top: 30px; }
        .register-form { padding: 40px 36px; }
        .form-row.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
        .field label { font-weight: 700; font-size: 0.85rem; }
        .field input, .field select, .field textarea {
          border: 2px solid #F1ECFF;
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-weight: 600;
          outline: none;
          font-family: var(--font-body);
        }
        .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--color-accent); }
        .field.has-error input, .field.has-error select { border-color: var(--color-primary); }
        .err { color: var(--color-primary-dark); font-size: 0.78rem; font-weight: 600; }
        .gender-options { display: flex; gap: 10px; }
        .gender-pill {
          border: 2px solid #F1ECFF;
          border-radius: var(--radius-pill);
          padding: 8px 16px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .gender-pill input { display: none; }
        .gender-pill.selected { background: var(--color-primary); border-color: var(--color-primary); color: white; }
        .login-hint { text-align: center; margin-top: 16px; font-size: 0.88rem; color: var(--color-text-light); }
        .login-hint a { color: var(--color-primary-dark); font-weight: 700; }

        @media (max-width: 760px) {
          .register-card { grid-template-columns: 1fr; }
          .form-row.two-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

export default Register

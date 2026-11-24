import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitDemoRequest } from '../../../data/api';
import Button from '../../ui/Button/Button';
import FormField from '../../ui/FormField/FormField';
import Icon from '../../ui/Icon/Icon';
import StatusMessage from '../../ui/StatusMessage/StatusMessage';
import styles from './ContactForm.module.scss';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 1000;

const teamSizes = [
  { value: '1-5', label: '1 to 5 people' },
  { value: '6-15', label: '6 to 15 people' },
  { value: '16-50', label: '16 to 50 people' },
  { value: '50+', label: 'More than 50 people' },
];

const defaultValues = {
  name: '',
  email: '',
  company: '',
  teamSize: '',
  message: '',
};

export default function ContactForm() {
  const [sentTo, setSentTo] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  const attemptRef = useRef(0);
  const successRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, mode: 'onTouched' });

  const messageLength = watch('message')?.length ?? 0;

  // Move focus to the confirmation so keyboard and screen reader users land on it.
  useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  const onSubmit = async (values) => {
    setSubmitError(false);
    try {
      await submitDemoRequest(values, { attempt: attemptRef.current });
      setSentTo({ name: values.name.trim().split(' ')[0], email: values.email });
      reset();
    } catch {
      setSubmitError(true);
    } finally {
      attemptRef.current += 1;
    }
  };

  if (sentTo) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>
          <Icon name="check" size={28} />
        </span>
        <h3 ref={successRef} tabIndex={-1} className={styles.successTitle}>
          Demo request sent
        </h3>
        <p className={styles.successBody}>
          Thanks, {sentTo.name}. We’ll email <strong>{sentTo.email}</strong> within one working
          day with a few times that suit you.
        </p>
        <Button variant="secondary" onClick={() => setSentTo(null)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="form-title">
      <h3 id="form-title" className={styles.title}>
        Book a demo
      </h3>
      <p className={styles.required}>All fields are required unless marked optional.</p>

      {submitError && (
        <StatusMessage tone="error" title="Your request didn’t send">
          Check your connection and select Send request again. Your answers are still filled in.
        </StatusMessage>
      )}

      <div className={styles.row}>
        <FormField
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          registration={register('name', {
            required: 'Enter your full name',
            validate: (value) => value.trim().length >= 2 || 'Name must be at least 2 characters',
          })}
        />
        <FormField
          label="Work email"
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email?.message}
          registration={register('email', {
            required: 'Enter your work email',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Enter an email address like name@company.com',
            },
          })}
        />
      </div>

      <div className={styles.row}>
        <FormField
          label="Company (optional)"
          autoComplete="organization"
          error={errors.company?.message}
          registration={register('company', {
            maxLength: { value: 100, message: 'Company name must be 100 characters or fewer' },
          })}
        />
        <FormField
          as="select"
          label="Team size"
          error={errors.teamSize?.message}
          registration={register('teamSize', { required: 'Choose your team size' })}
        >
          <option value="" disabled>
            Choose one
          </option>
          {teamSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </FormField>
      </div>

      <FormField
        as="textarea"
        label="What would you like to see?"
        hint={`For example, how you run sprints today. ${messageLength} of ${MESSAGE_MAX} characters.`}
        rows={5}
        error={errors.message?.message}
        registration={register('message', {
          required: 'Tell us a little about your team',
          minLength: { value: 20, message: 'Write at least 20 characters' },
          maxLength: { value: MESSAGE_MAX, message: `Keep it under ${MESSAGE_MAX} characters` },
        })}
      />

      <div className={styles.footer}>
        <Button type="submit" disabled={isSubmitting} aria-describedby="privacy-note">
          {isSubmitting ? 'Sending…' : 'Send request'}
        </Button>
        <p id="privacy-note" className={styles.privacy}>
          We only use your details to arrange the demo.
        </p>
      </div>
    </form>
  );
}

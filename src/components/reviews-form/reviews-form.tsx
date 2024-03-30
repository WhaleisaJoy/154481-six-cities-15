import { ReactEventHandler, useState } from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';

export type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function ReviewsForm(): JSX.Element {
  const [form, setForm] = useState({
    rating: '0',
    review: '',
  });

  const handleChange: TChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <ReviewsRating
        handleChange={handleChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form.review}
        onChange={handleChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
            your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={form.review.length < 50 || form.rating === '0'}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;

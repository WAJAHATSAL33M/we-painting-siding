import QuoteForm from '../components/quote-form';

export default function LocationRequest({ city }) {
  return <QuoteForm kind="location" city={city}/>;
}

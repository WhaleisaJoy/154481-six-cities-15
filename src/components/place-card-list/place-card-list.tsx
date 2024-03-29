import PlaceCard from '../place-card/place-card';
import { GeneralOffer } from '../types/offers';

type PlaceCardListProps = {
  offers: GeneralOffer[];
}

function PlaceCardList({ offers }: PlaceCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
          />
        ))
      }
    </div>
  );
}

export default PlaceCardList;

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/Card';
import Map from '@/components/Map';
import { StaticImage } from 'gatsby-plugin-image';

const Venue = (props) => {
  return (
    <Card id="venue" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
      <h2 className="major">A helyszín</h2>
      <span className="image main">
        <StaticImage formats={['auto', 'webp']} src="../../static/assets/villa.jpg" alt="Venue" />
      </span>

      <Map center={{ lat: 47.50530903649446, lng: 19.01786543666104 }} />

      <h4 style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <a
          href="https://ul.waze.com/ul?preview_venue_id=12452315.124654223.5259128&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
          target="_blank" rel="noopener noreferrer">
          Vezess ide waze!
        </a>
      </h4>

      <h3 style={{ paddingTop: '1rem' }}>Szállások a közelben</h3>
      <p style={{ margin: 0 }}>
        <a
          href="https://www.booking.com/hotel/hu/blue-ball-apartment-budapest.hu.html?aid=2311236&label=hu-hu-booking-mobile-_9td8vcLEKH_6wpGG%2Ai7TwSM652796014995%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9063071%3Ali%3Adem%3Adm-Share-QXdz6s8%401708285037&sid=e41083b1b5a0450306b09bec629ecab4&all_sr_blocks=154508201_329601305_2_0_0;checkin=2024-10-04;checkout=2024-10-06;dest_id=-850553;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=154508201_329601305_2_0_0;hpos=1;matching_block_id=154508201_329601305_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=154508201_329601305_2_0_0__15360;srepoch=1708458709;srpvid=a66d8b92e69e01a8;type=total;ucfs=1&#hotelTmpl"
          target="_blank" rel="noopener noreferrer">
          Blue Ball Apartment
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="https://www.booking.com/hotel/hu/krisztina-21-jiu-dian-hao-hua-liang-ju-shi-gong-yu.hu.html?aid=2311236&label=hu-hu-booking-mobile-_9td8vcLEKH_6wpGG%2Ai7TwSM652796014995%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9063071%3Ali%3Adem%3Adm-Share-bU6mSi%401708285081&sid=e41083b1b5a0450306b09bec629ecab4&all_sr_blocks=896248910_373056393_2_0_0;checkin=2024-10-04;checkout=2024-10-06;dest_id=-850553;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=896248910_373056393_2_0_0;hpos=1;matching_block_id=896248910_373056393_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=896248910_373056393_2_0_0__18484;srepoch=1708458818;srpvid=d7228b931d2503a4;type=total;ucfs=1&#hotelTmpl"
          target="_blank" rel="noopener noreferrer">
          Krisztina 21 Apartment
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="https://www.booking.com/hotel/hu/szabi-buda-new-terrace-free-parking.hu.html?aid=2311236&label=hu-hu-booking-mobile-_9td8vcLEKH_6wpGG%2Ai7TwSM652796014995%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9063071%3Ali%3Adem%3Adm-Share-BkrWnx%401708285315&sid=e41083b1b5a0450306b09bec629ecab4&all_sr_blocks=986426301_371033086_0_0_0;checkin=2024-10-04;checkout=2024-10-06;dest_id=-850553;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=986426301_371033086_0_0_0;hpos=1;matching_block_id=986426301_371033086_0_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=986426301_371033086_0_0_0__20212;srepoch=1708458879;srpvid=dade8b95e9d200fd;type=total;ucfs=1&#hotelTmpl"
          target="_blank" rel="noopener noreferrer">
          Szabi Buda New Terrace
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="https://www.booking.com/hotel/hu/goodwind-aparthotel.hu.html?aid=2311236&label=hu-hu-booking-mobile-_9td8vcLEKH_6wpGG%2Ai7TwSM652796014995%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9063071%3Ali%3Adem%3Adm-Share-1tQloA%401708285379&sid=e41083b1b5a0450306b09bec629ecab4&all_sr_blocks=1119009608_386063868_2_0_0;checkin=2024-10-04;checkout=2024-10-06;dest_id=-850553;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=1119009608_386063868_2_0_0;hpos=1;matching_block_id=1119009608_386063868_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=1119009608_386063868_2_0_0__17533;srepoch=1708458940;srpvid=86898b991d4d00ae;type=total;ucfs=1&#hotelTmpl"
          target="_blank" rel="noopener noreferrer">
          GoodWind Aparthotel
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="https://camillehouse.hu/hu"
          target="_blank" rel="noopener noreferrer">
          Camille Apartments
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="http://www.citymajorapartment.hu"
          target="_blank" rel="noopener noreferrer">
          Citymajor Apartment***
        </a>
      </p>
  </Card>
  );
};

Venue.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Venue;

import { React } from 'react'; 

// About Us page
function AboutUsMain() { // usage of singleton design pattern for this component
  return (
    <div className="boxed">
      <div className="aboutText">
        Hello!
        <div>We are Team IMAX here to deliver our amazing product, &quot;MIMAX&quot;</div>
        <div>Our team members are:</div>
        <div>Connor Patterson, RuoWen Ren, Tristan Roberts, Yash Sabarad and Arya Selvam</div>
        <br />
        <div><em>Why create MIMAX?</em></div>
        <div>We created MIMAX with the belief that we are able to make a website like <a style={{ color: '#000000' }} href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">IMDB</a> but without the hassle of navigating a cluttered mess</div>
        <br />
        <div>Our team, throughout the semester, utilized an Agile</div>
        <div>methodology to help better accomplish our goal as well as</div>
        <div>enhance our product to its maxmimum</div>
        <br />
        <div>Hopefully, even after the semester ends, we will be able to</div>
        <div>continue making our product better to showcase to other people other than SD&D</div>
      </div>
    </div>
  );
}

export default AboutUsMain;

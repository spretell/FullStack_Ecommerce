// useEffect - used to run side effects in functional components ; in this case , we use it to set up an interval that changes the review being displayed every few seconds
// useState - used to create state variables in functional components ; we use it to track the current review index and whether the review is currently fading for the transition effect
import { useEffect, useState } from "react";

// create functional component for the home page ; exported so App.jsx can use it in the route
export default function Home() {
  // array of review objects to display in the rotating review section ; each object has text , name , and role properties
  const reviews = [
    {
      text: "We started using Bake Brunch Co. in our small town local café and customers keep asking where they can buy the mixes every day!",
      name: "Sam K.",
      role: "Café Owner",
    },
    {
      text: "The waffle mix is unreal — crispy edges, fluffy center. Weekend brunch is officially effortless.",
      name: "Jordan M.",
      role: "Home Cook",
    },
    {
      text: "Fast mornings, zero mess. It tastes like something you'd get from a bakery.",
      name: "Alyssa R.",
      role: "Busy Parent",
    },
  ];

  // reviewIndex - tracks which review is currently being displayed ; starts at 0 to show the first review
  // isFading - controls whether the review quote has the fading class for the CSS transition effect ; starts as false (not fading)
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // useEffect to set up an interval that changes the review every 4.5 seconds ; it first sets isFading to true to trigger the fade-out CSS transition , then after 600ms (the duration of the fade-out) it updates the reviewIndex to show the next review and sets isFading back to false to fade it back in
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % reviews.length);
        setIsFading(false);
      }, 600); // matches CSS transition
    }, 4500);

    // clear the interval when the component unmounts to prevent memory leaks and unintended behavior
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      {/* hero video */}
      <div className="page-shell">
        <section className="hero-video-wrapper">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/media/pancake_video1.mp4" type="video/mp4" />
          </video>

          <div className="hero-video-overlay">
            <p className="eyebrow">15-minute breakfasts</p>
            <h1>Stacks on stacks, without the stress.</h1>
            <p>
              Pancake & waffle mixes crafted for effortless mornings. Big
              flavor, made simple.
            </p>
          </div>
        </section>
      </div>

      {/* about section */}
      <section className="section-break-cream" aria-labelledby="about-heading">
        <div className="section-inner">
          <div className="about-copy">
            <h2 id="about-heading">
              Breakfast that actually fits your morning.
            </h2>

            <p>
              Bake Brunch Co. mixes are designed for real life. It's simple to
              prep, easy to clean up, and made with ingredients you can actually
              pronounce.
            </p>

            <p>
              No matter the occasion, our mixes deliver café-style brunch in the
              matter of minutes. From fluffy pancakes to crispy waffles, we've
              got your mornings covered.
            </p>

            <div className="reviews-block">
              <div className="reviews-stars">★★★★★</div>

              <blockquote
                className={`review-quote ${isFading ? "is-fading" : ""}`}
              >
                <span id="review-text">“{reviews[reviewIndex].text}”</span>
                <footer>
                  <span className="review-name">
                    {reviews[reviewIndex].name}
                  </span>
                  <span className="review-role">
                    {reviews[reviewIndex].role}
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="about-media">
            <div className="image-badge-wrapper">
              {/* badge */}
              <svg className="new-icon" viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="30" fill="#b12424" />
                <text
                  x="32"
                  y="38"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="Pramukh Rounded, sans-serif"
                  fill="#fff"
                  fontWeight="700"
                >
                  NEW!
                </text>
              </svg>

              <img
                className="about-image"
                src="/media/maplemix.png"
                alt="Bake Brunch Co. Maple Crunch Pancake Mix"
              />
            </div>
          </div>
        </div>
      </section>

      {/* red quote section */}
      <section className="pancake-quote-section">
        <div className="pancake-quote-inner">
          <h2 className="pancake-quote">
            PANCAKES REMIND US THAT BREAKFAST CAN BE BOTH EASY
            <br />
            AND SPECIAL AT THE SAME TIME.
          </h2>

          <img
            className="pancake-quote-image"
            src="/media/quotestack.PNG"
            alt="Stack of pancakes"
          />
        </div>
      </section>
    </>
  );
}

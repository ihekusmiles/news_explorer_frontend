function About() {
  return (
    <section className="about">
      <img
        className="about__image"
        src="../../src/assets/images/future_woman.jpg"
        alt="image"
        // frontend\src\assets\images\placeholder_image.svg
      />
      <div className="about__container">
        <p className="about__title-text">About the author</p>
        <p className="about__paragraph">
          {" "}
          Hi! I'm Hector, a full-stack developer passionate about building fast,
          intuitive, and visually polished web applications.
        </p>
        <p className="about__paragraph">
          {" "}
          Some frontend development technologies I have experience with include
          React, Javascript(ES6+), HTML5 & CSS, as well as backend technologies
          like Node.js, Express, MongoDB.{" "}
        </p>{" "}
        <p className="about__paragraph">
          Through the TripleTen Software Engineering program, I learned to
          develop full-stack applications following modern industry best
          practices. I gained extensive hands-on experience creating structured
          React component hierarchies, consuming third-party REST APIs, and
          building secure backends. I help potential customers and teams
          transform concepts or Figma designs into clean, responsive, and
          user-friendly web solutions built for growth.
        </p>
      </div>
    </section>
  );
}

export default About;

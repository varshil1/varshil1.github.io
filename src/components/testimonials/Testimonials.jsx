import "./testimonials.scss";

export default function Testimonials() {
  const data = [
    {
      id: 1,
      name: "Snowflake Data Warehousing",
      title: "By Snowflake",
      img: "assets/snowflake_logo.png",
      icon: "assets/snowflake_logo_big.png",
      desc: "Data warehousing, Data Modeling, Snowflake Databases, SQL",
      cert_auth:"https://achieve.snowflake.com/0242850b-d0ba-445f-b154-ff53d37c523c",
      },
    {
      id: 2,
      name: "Spark AR developer",
      title: "By Facebook",
      img:
        "data:image/png;base64,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",
      icon: "assets/facebook.png",
      desc: "AR Content Creation, 3D Modeling, Interactive AR Effects, AR Platform Knowledge",
      cert_auth:"https://files.sv.co/soi/0820/completion/Varshil_ChetanKumar_Shah-6d32de5.pdf",
      featured2: true,
      },
    {
      id: 3,
      name: "Machine Learning with python",
      title: "By IBM",
      img:
        "data:image/png;base64,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",
      icon: "assets/coursera.png",
      desc:
      "Algorithm Development, Data Preprocessing, Model Evaluation, Predictive Analytics",
        cert_auth:"https://www.coursera.org/account/accomplishments/certificate/LRF9FSXFE9NV",
        featured: true,
    },
    {
      id: 4,
      name: "Deep Learning Specialization",
      title: "DeepLearning.ai , Coursera",
      img:
        "data:image/jpeg;base64,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",
      icon: "assets/coursera.png",
      desc:
        "Neural Networks, Deep Learning Frameworks, Computer Vision, Natural Language Processing (NLP)",
        cert_auth:"https://www.coursera.org/account/accomplishments/certificate/HDTHG9DE6AP3",
        featured2: true,
      },
    {
      id: 5,
      name: "Become A Data Analyst Specialization",
      title: "Linkedin Learning",
      img:
        "assets/linkedin_learning.jpg",
      icon: "assets/python.jpg",
      desc:
      "Data Visualization, Statistical Analysis, Data Cleaning, Data Reporting ",
        cert_auth:"https://drive.google.com/file/d/1N3MepsAaTvSluEaOrkH3CuGOXRLbV9S3/view",
      },
  ];
  return (
    <div className="testimonials" id="testimonials">
      <h1>Certifications</h1>
      <div className="container">
        {data.map((d) => (
          <div className={d.featured ? "card featured" : (d.featured2 ? "card featured2" : "card")}>
            <div className="top">
              <img src="assets/right-arrow.png" className="left" alt="" />
              <img
                className="user"
                src={d.img}
                alt=""
              />
              <img className="right" src={d.icon} alt="" />
            </div>
            <div className="center">
              {d.desc}
            </div>
            <div className="bottom">
              <h3>{d.name}</h3>
              <h4>{d.title}</h4>
            </div>
            <a target="_blank" href={d.cert_auth} className="certificate-btn">Certificate</a>
          </div>
        ))}
      </div>
    </div>
  );
}
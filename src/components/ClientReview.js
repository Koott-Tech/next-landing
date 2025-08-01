'use client';

import React from "react";

const ClientReview = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      message: "The therapy sessions have completely transformed my approach to anxiety. Dr. Irene is incredibly supportive and the platform is so convenient.",
      job: "Marketing Manager",
      video: "intro_1.mp4",
      image: "irene.jpeg"
    },
    {
      name: "Michael Chen",
      message: "I was skeptical about online therapy at first, but the quality of care is exceptional. The chat feature helps me stay connected throughout the week.",
      job: "Software Engineer",
      video: "intro_2.mp4",
      image: "patient.jpg"
    },
    {
      name: "Emily Rodriguez",
      message: "Finding the right therapist was so easy with their matching system. The video sessions feel just as personal as in-person therapy.",
      job: "Teacher",
      video: "intro_3.mp4",
      image: "irene.jpeg"
    },
    {
      name: "David Thompson",
      message: "The flexibility of this platform is amazing. I can get support whenever I need it, and the progress tracking helps me stay motivated.",
      job: "Business Consultant",
      video: "intro_4.mp4",
      image: "patient.jpg"
    },
    {
      name: "Lisa Anderson",
      message: "The personalized approach really makes a difference. My therapist understands my unique situation and provides tailored guidance.",
      job: "Nurse",
      video: "intro_5.mp4",
      image: "irene.jpeg"
    },
    {
      name: "James Wilson",
      message: "I've tried many therapy platforms, but this one stands out. The quality of therapists and the user experience are unmatched.",
      job: "Architect",
      video: "intro_1.mp4",
      image: "patient.jpg"
    },
    {
      name: "Maria Garcia",
      message: "The convenience of online therapy has made it possible for me to prioritize my mental health despite my busy schedule.",
      job: "Lawyer",
      video: "intro_2.mp4",
      image: "irene.jpeg"
    },
    {
      name: "Robert Kim",
      message: "The matching system found me the perfect therapist on the first try. I feel heard and supported every session.",
      job: "Entrepreneur",
      video: "intro_3.mp4",
      image: "patient.jpg"
    }
  ];

  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 0",
        position: "relative",
        zIndex: 1,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          gap: "3rem"
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 700,
            marginBottom: "2rem",
            padding: "0 2rem"
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "2.5rem",
              marginBottom: "1rem",
              lineHeight: 1.2
            }}
          >
            What Our Clients Say
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Real stories from people who have transformed their mental health 
            through our personalized therapy platform.
          </p>
        </div>

        {/* Review Cards Container */}
        <div
          style={{
            width: "100vw",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            className="scrolling-container"
            style={{
              display: "flex",
              gap: "1.5rem",
              width: "max-content",
              animation: "scrollLeft 30s linear infinite",
              padding: "0"
            }}
          >
            <style>{`
              @keyframes scrollLeft {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scrolling-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            {/* First set of cards */}
            {reviews.map((review, index) => (
              <div
                key={`first-${index}`}
                style={{
                  width: "280px",
                  height: "400px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 12px 32px rgba(39, 174, 96, 0.15)",
                  border: "2px solid rgba(39, 174, 96, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(39, 174, 96, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(39, 174, 96, 0.15)";
                }}
              >
                {/* Background - Video for odd indices, Image for even indices */}
                {index % 2 === 0 ? (
                  <video
                    src={"/" + review.video}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={"/" + review.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }}
                    alt={review.name}
                  />
                )}
                
                {/* Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                    zIndex: 2
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.5rem",
                    zIndex: 3,
                    color: "#fff"
                  }}
                >
                  {/* Message */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                      fontWeight: 400,
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                    }}
                  >
                    &ldquo;{review.message}&rdquo;
                  </p>
                  
                  {/* Client Info */}
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        margin: "0 0 0.2rem 0",
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                      }}
                    >
                      {review.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        margin: 0,
                        opacity: 0.9,
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                      }}
                    >
                      {review.job}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, index) => (
              <div
                key={`second-${index}`}
                style={{
                  width: "280px",
                  height: "400px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 12px 32px rgba(39, 174, 96, 0.15)",
                  border: "2px solid rgba(39, 174, 96, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(39, 174, 96, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(39, 174, 96, 0.15)";
                }}
              >
                {/* Background - Video for odd indices, Image for even indices */}
                {index % 2 === 0 ? (
                  <video
                    src={"/" + review.video}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={"/" + review.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }}
                    alt={review.name}
                  />
                )}
                
                {/* Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                    zIndex: 2
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.5rem",
                    zIndex: 3,
                    color: "#fff"
                  }}
                >
                  {/* Message */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                      fontWeight: 400,
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                    }}
                  >
                    &ldquo;{review.message}&rdquo;
                  </p>
                  
                  {/* Client Info */}
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        margin: "0 0 0.2rem 0",
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                      }}
                    >
                      {review.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        margin: 0,
                        opacity: 0.9,
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                      }}
                    >
                      {review.job}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReview; 
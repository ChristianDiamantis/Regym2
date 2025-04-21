import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <main className="hero">
        <h2>Buy & Sell Gym Gear Locally</h2>
        <p>
          ReGym helps you find affordable gym equipment or sell your own — fast,
          easy, and with zero hassle.
        </p>
        <button onClick={() => navigate("/login")}>Explore Listings</button>
      </main>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h4>1. Sign Up</h4>
          <p>Create your free account and set your preferences.</p>
        </div>
        <div className="feature-card">
          <h4>2. Browse or Post</h4>
          <p>List your equipment or shop what others are offering.</p>
        </div>
        <div className="feature-card">
          <h4>3. Make the Deal</h4>
          <p>Connect, chat, and meet up or arrange shipping.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="info-section">
        <h3>How ReGym Works</h3>
        <p>
          Whether you're decluttering your home gym or hunting for budget
          equipment, ReGym makes it simple:
        </p>
        <ul>
          <li>Post listings in under 2 minutes</li>
          <li>Message buyers and sellers directly</li>
          <li>Set your own prices and terms</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonial-card">
          <p>"I saved over $300 furnishing my gym with ReGym!"</p>
          <span>- Alex J.</span>
        </div>
        <div className="testimonial-card">
          <p>"Super easy to use, and I sold my squat rack in a day!"</p>
          <span>- Brittany S.</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h3>Start Your Fitness Journey Today</h3>
        <p>Join thousands of users who trust ReGym to power their workouts.</p>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

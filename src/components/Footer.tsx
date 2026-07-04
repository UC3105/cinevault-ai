import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="footer-logo">CV</span>
        <span className="footer-name">CineVault</span>
        <p className="footer-tagline">Your trusted guide to great cinema.</p>
      </div>
      <div className="footer-links">
        <p className="footer-col-title">Explore</p>
        <a href="#">Top Rated</a>
        <a href="#">New Releases</a>
        <a href="#">By Genre</a>
        <a href="#">Watchlist</a>
      </div>
      <div className="footer-links">
        <p className="footer-col-title">About</p>
        <a href="#">About Us</a>
        <a href="#">Advertise</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 CineVault. All rights reserved.</span>
      <span className="footer-affiliate">Some links are affiliate links — we may earn a small commission at no cost to you.</span>
    </div>
  </footer>
)

export default Footer

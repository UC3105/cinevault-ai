import './AdBanner.css'

const AdBanner = () => (
  <div className="ad-banner">
    <span className="ad-label">Advertisement</span>
    <div className="ad-slot">
      {/* Replace this div's content with your Google AdSense code */}
      <p className="ad-placeholder">Your Ad Here — <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer">Get AdSense</a></p>
    </div>
  </div>
)

export default AdBanner

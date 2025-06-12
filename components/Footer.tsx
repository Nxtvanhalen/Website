export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img 
            src="/images/Purple Logo.png" 
            alt="CLB Consulting Logo" 
            className="h-8 w-auto"
          />
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CLB Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
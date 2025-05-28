export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span>CLB</span>Consultancy
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CLB Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
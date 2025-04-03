
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Info Stream Africa</h3>
            <p className="text-muted-foreground">
              Latest news and updates from Africa and around the world.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/world-news" className="text-muted-foreground hover:text-primary">World News</Link></li>
              <li><Link to="/africa" className="text-muted-foreground hover:text-primary">Africa</Link></li>
              <li><Link to="/science" className="text-muted-foreground hover:text-primary">Science</Link></li>
              <li><Link to="/health" className="text-muted-foreground hover:text-primary">Health</Link></li>
              <li><Link to="/technology" className="text-muted-foreground hover:text-primary">Technology</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/journals" className="text-muted-foreground hover:text-primary">Journals</Link></li>
              <li><Link to="/conferences" className="text-muted-foreground hover:text-primary">Conferences</Link></li>
              <li><Link to="/videos" className="text-muted-foreground hover:text-primary">Videos</Link></li>
              <li><Link to="/youtube" className="text-muted-foreground hover:text-primary">YouTube Channel</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-muted-foreground mb-2">Have questions or feedback?</p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail size={18} />
              <span>contact@infostreamafrica.com</span>
            </div>
            <p className="text-muted-foreground mt-4">Subscribe to our newsletter for updates</p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-muted-foreground/20 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Info Stream Africa. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

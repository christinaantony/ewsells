import { useState, useEffect } from 'react';
import { ToastProvider, useToast } from '@/components/ui/toast-context';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InstallPrompt } from '@/components/ui/install-prompt';
import { Home } from '@/pages/Home';
import SearchPage from '@/pages/SearchPage';
import { Products } from '@/pages/Products';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import ChatPage from '@/pages/ChatPage';
import { GreenCupChallengePage } from '@/pages/GreenCupChallenge';
import { HelpingHandsPage } from '@/pages/HelpingHands';
import HelpingHandsRegister from '@/pages/HelpingHandsRegister';
import { HomePlantPage } from '@/pages/HomePlant';
import ScrapStorePage from '@/pages/ScrapStorePage';
import CharityCraftPage from '@/pages/CharityCraftPage';
import MomsMadeUnitedPage from '@/pages/MomsMadeUnited';
import { initSmoothScroll } from '@/lib/smooth-scroll';
import { registerServiceWorker } from '@/lib/pwa';
import { useStore } from '@/store/useStore';
import { SellerRegistration } from '@/pages/SellerRegistration';
import { SellerAgreement } from '@/pages/SellerAgreement';
import { SellerDashboard } from '@/pages/SellerDashboard';
// import SellerUploadRedirect from '@/pages/SellerUploadRedirect';
import { SellerLayout } from '@/components/layout/SellerLayout';
import SellerPortal from '@/pages/SellerPortal';
import RequireSellerPortal from '@/components/routes/RequireSellerPortal';
import SellerLogin from '@/pages/SellerLogin';
import { AdminSellerApprovals } from '@/pages/AdminSellerApprovals';
import SellerOrdersPage from '@/pages/SellerOrdersPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import AdminOrdersPage from '@/pages/AdminOrdersPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminAnalyticsPage from '@/pages/AdminAnalyticsPage';
import AdminHelpingHandsPage from '@/pages/AdminHelpingHandsPage';
import AdminProductsPage from '@/pages/AdminProductsPage';
import AdminOrderCorrectionsPage from '@/pages/AdminOrderCorrectionsPage';
import { CategoryRequestsPage } from '@/pages/CategoryRequestsPage';
import SellerProductsPage from '@/pages/seller/SellerProductsPage';
import { AdminLogin } from '@/pages/AdminLogin';
import { SellerModal } from '@/components/ui/seller-modal';
import { Button } from '@/components/ui/button';
import { AdminNav } from '@/components/ui/admin-nav';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import logo from '@/assets/logo.png';
import { doc, getDoc, collection, getCountFromServer, query, where } from 'firebase/firestore';
import CharityBakesPage from '@/pages/CharityBakes';
import ProductDetailsPage from '@/pages/ProductDetails';
import { PackedFoodPage } from '@/pages/PackedFood';
import { BirthdayGiftsPage } from '@/pages/BirthdayGifts';
import { HomemadeHouseholdsPage } from '@/pages/HomemadeHouseholds';
import { HeartHandshake, Wrench, Megaphone, PackagePlus } from 'lucide-react';
import CharityCraftUpload from '@/pages/CharityCraftUpload';
import OrganicStoreUpload from '@/pages/OrganicStoreUpload';
import ScrapStoreUpload from '@/pages/ScrapStoreUpload';
import CharityBakesUpload from '@/pages/CharityBakesUpload';
import HomeDecorUpload from '@/pages/HomeDecorUpload';
import PackedFoodUpload from '@/pages/PackedFoodUpload';
import HomePlantsUpload from '@/pages/HomePlantsUpload';
import BeautyHomemadeUpload from '@/pages/BeautyHomemadeUpload';
import HomemadeHouseholdsUpload from '@/pages/HomemadeHouseholdsUpload';
import BeautyProductsPage from '@/pages/BeautyProductsPage';
import { OrganicStorePage } from '@/pages/OrganicStore';
import HomeDecorPage from '@/pages/HomeDecorPage';
import BirthdayGiftsUpload from '@/pages/BirthdayGiftsUpload';
import GreenCupChallengeUpload from '@/pages/GreenCupChallengeUpload';
import MomsMadeUnitedUpload from '@/pages/MomsMadeUnitedUpload';
import ReferFriends from '@/pages/ReferFriends';
import AllProducts from '@/pages/AllProducts';
import WishlistPage from '@/pages/Wishlist';
import ShoppingCartPage from '@/pages/ShoppingCartPage';
import { CartProvider } from './contexts/CartContext';

import { ScrapStoreBooks } from '@/pages/ScrapStoreBooks';
import ScrapBooksUpload from '@/pages/ScrapBooksUpload';
import ProfilePage from '@/pages/ProfilePage';
import CardPaymentPage from '@/pages/CardPaymentPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import CheckoutDetailsPage from '@/pages/CheckoutDetailsPage';
import OrdersPage from '@/pages/OrdersPage';
import CustomizeChat from '@/pages/CustomizeChat';
import SellerCustomizations from '@/pages/SellerCustomizations';
import SellerCustomizeChat from '@/pages/SellerCustomizeChat';
import UserCustomizations from '@/pages/UserCustomizations';
import SellerPromotionsPage from '@/pages/SellerPromotions';
import SellerPromotionsCheckout from './pages/SellerPromotionsCheckout';
import { AdminPromotionsPage } from './pages/AdminPromotions';
import SaveForLaterPage from '@/pages/SaveForLaterPage';
import RegisteredSellersPage from '@/pages/RegisteredSellersPage';


// Page components (simplified for demo)

function ComingSoonPage({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-12 flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg">Coming soon...</p>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ToastProvider>
  );
}

function AppContent() {
  const { setOnlineStatus, setUser, user } = useStore();
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [isSellerApproved, setIsSellerApproved] = useState(false);
  const { showToast } = useToast();
  const [prevUserId, setPrevUserId] = useState<string | null>(null);
  
  // Show welcome message when user logs in
  useEffect(() => {
    const suppressed = localStorage.getItem('suppressWelcome') === 'true';
    if (suppressed) return; // do not show toast during post-registration auto-login window
    if (user && user.displayName && prevUserId !== user.id) {
      setPrevUserId(user.id);
      showToast({
        message: `Welcome, ${user.displayName}! 👋`,
        type: 'success',
        duration: 4000
      });
    }
  }, [user, showToast, prevUserId]);

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();

    // Register service worker
    registerServiceWorker();

    // Network status listeners
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for face authentication session data in localStorage
    const checkLocalStorageAuth = async () => {
      const faceAuthSession = localStorage.getItem('faceAuthSession');
      const currentUserJson = localStorage.getItem('currentUser');
      const forceRefresh = localStorage.getItem('forceDataRefresh');
      
      if (faceAuthSession && currentUserJson) {
        try {
          // Always fetch fresh data from Firestore
          // This ensures we get the latest user data after re-login
          const userDoc = await getDoc(doc(db, 'users', faceAuthSession));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const isBlocked = userData?.blocked === true || userData?.disabled === true || userData?.status === 'blocked' || userData?.status === 'deleted';
            if (isBlocked) {
              // Clear session and user state
              localStorage.removeItem('faceAuthSession');
              localStorage.removeItem('currentUser');
              setUser(null);
              setIsSellerApproved(false);
              try { await signOut(auth); } catch {}
              return;
            }
            const currentUser = JSON.parse(currentUserJson);
            
            // Create a complete user object with all necessary fields
            const completeUser = {
              id: faceAuthSession,
              uid: faceAuthSession,
              email: userData.email || currentUser.email || '',
              displayName: userData.displayName || currentUser.displayName || '',
              photoURL: userData.photoURL || '',
              phoneNumber: userData.phoneNumber || '',
              addresses: userData.addresses || [],
              defaultAddressId: userData.defaultAddressId,
              role: userData.role || currentUser.role || 'user',
              createdAt: userData.createdAt || new Date(),
              updatedAt: new Date() // Always update the timestamp
            };
            
            // Set user in the store
            setUser(completeUser);
            
            console.log('User data loaded from Firestore:', userData.displayName);
            console.log('Setting user in store:', completeUser);
            
            // Update localStorage with the latest data
            localStorage.setItem('currentUser', JSON.stringify({
              uid: faceAuthSession,
              email: userData.email || '',
              displayName: userData.displayName || '',
              photoURL: userData.photoURL || '',
              phoneNumber: userData.phoneNumber || '',
              addresses: userData.addresses || [],
              defaultAddressId: userData.defaultAddressId,
              role: completeUser.role,
              lastLogin: new Date().toISOString()
            }));
            
            // Check seller status
            const sellerRegistrationRef = doc(db, 'seller-registrations', faceAuthSession);
            const sellerRegistrationDoc = await getDoc(sellerRegistrationRef);
            
            if (sellerRegistrationDoc.exists()) {
              const sellerData = sellerRegistrationDoc.data();
              setIsSellerApproved(sellerData.status === 'approved');
            }
            
            // Clear the force refresh flag after loading data
            if (forceRefresh) {
              localStorage.removeItem('forceDataRefresh');
            }
          } else {
            // No Firestore user, clear any face session and block
            localStorage.removeItem('faceAuthSession');
            localStorage.removeItem('currentUser');
            setUser(null);
            setIsSellerApproved(false);
            try { await signOut(auth); } catch {}
            return;
          }
        } catch (error) {
          console.error('Error loading user data from localStorage:', error);
        }
      }
    };

    // Set up auth state listener
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      // Check for force refresh flag
      const forceRefresh = localStorage.getItem('forceDataRefresh');
      const faceAuthSession = localStorage.getItem('faceAuthSession');
      const suppressWelcome = localStorage.getItem('suppressWelcome') === 'true';

      
      if (firebaseUser) {
        // During registration, Firebase auto signs in newly created users.
        // If suppression flag is set, skip setting user state to avoid navbar flash.
        if (suppressWelcome) {
          return;
        }
        // User is signed in with Firebase Auth
        try {
          // Ensure we have the latest profile (displayName/photoURL) immediately after sign-up
          try {
            await firebaseUser.reload();
          } catch {}
          const freshUser = auth.currentUser || firebaseUser;
          
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', freshUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const isBlocked = userData?.blocked === true || userData?.disabled === true || userData?.status === 'blocked' || userData?.status === 'deleted';
            if (isBlocked) {
              // Clear state and sign out; also clear any face session cache
              localStorage.removeItem('faceAuthSession');
              localStorage.removeItem('currentUser');
              setUser(null);
              setIsSellerApproved(false);
              try { await signOut(auth); } catch {}
              return;
            }
            
            // Create complete user object with all necessary fields
            const completeUser = {
              id: freshUser.uid,
              uid: freshUser.uid,
              email: freshUser.email || userData.email || '',
              displayName: freshUser.displayName || userData.displayName || '',
              photoURL: freshUser.photoURL || userData.photoURL || '',
              phoneNumber: userData.phoneNumber || '',
              addresses: userData.addresses || [],
              defaultAddressId: userData.defaultAddressId,
              role: userData.role || 'user',
              createdAt: userData.createdAt || new Date(),
              updatedAt: new Date() // Always update timestamp
            };
            
            // Set user in the store
            setUser(completeUser);
            
            console.log('User data loaded from Firebase Auth:', completeUser.displayName);
            
            // Store the latest user data in localStorage for face auth
            localStorage.setItem('currentUser', JSON.stringify({
              uid: freshUser.uid,
              email: freshUser.email || userData.email || '',
              displayName: freshUser.displayName || userData.displayName || '',
              photoURL: freshUser.photoURL || userData.photoURL || '',
              phoneNumber: userData.phoneNumber || '',
              addresses: userData.addresses || [],
              defaultAddressId: userData.defaultAddressId,
              role: completeUser.role,
              lastLogin: new Date().toISOString()
            }));
            
            // Check seller status
            const sellerRegistrationRef = doc(db, 'seller-registrations', freshUser.uid);
            const sellerRegistrationDoc = await getDoc(sellerRegistrationRef);
            
            if (sellerRegistrationDoc.exists()) {
              const sellerData = sellerRegistrationDoc.data();
              setIsSellerApproved(sellerData.status === 'approved');
            }
            
            // Clear force refresh flag if it exists
            if (forceRefresh) {
              localStorage.removeItem('forceDataRefresh');
            }
          } else {
            // If Firestore user doc missing, block access and sign out
            localStorage.removeItem('faceAuthSession');
            localStorage.removeItem('currentUser');
            setUser(null);
            setIsSellerApproved(false);
            try { await signOut(auth); } catch {}
            return;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // User is signed out of Firebase Auth
        // Check if we have a face auth session before clearing user
        const currentUserJson = localStorage.getItem('currentUser');
        
        if (!faceAuthSession || !currentUserJson) {
          // No face auth session, clear user state
          setUser(null);
          setIsSellerApproved(false);
          console.log('User signed out, no face auth session found');
        } else {
          // We have face auth session, load it
          console.log('Loading user data from face auth session');
          await checkLocalStorageAuth();
        }
      }
    });

    // Check for face auth session on initial load
    checkLocalStorageAuth();

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribeAuth();
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [setOnlineStatus, setUser]);

  return (
    <Router>
      <RoutedApp 
        showSellerModal={showSellerModal}
        setShowSellerModal={setShowSellerModal}
        isSellerApproved={isSellerApproved}
      />
    </Router>
  );
}

// Admin navbar shown only on admin pages (excluding /admin-login)
function AdminNavbar() {
  const navigate = useNavigate();
  const [hhCount, setHhCount] = useState<number | null>(null);
  const [correctionsPendingCount, setCorrectionsPendingCount] = useState<number | null>(null);
  const [sellerPendingCount, setSellerPendingCount] = useState<number | null>(null);
  const [unpublishedProductsCount, setUnpublishedProductsCount] = useState<number | null>(null);
  const location = useLocation();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Calculate total notifications
  const totalNotifications = (hhCount || 0) + (sellerPendingCount || 0) + (unpublishedProductsCount || 0) + (correctionsPendingCount || 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // no-op; still navigate out
    } finally {
      navigate('/');
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pendingQ = query(collection(db, 'helping-hands-requests'), where('status', '==', 'pending'));
        const snap = await getCountFromServer(pendingQ);
        if (!cancelled) setHhCount(snap.data().count);
      } catch (e) {
        // swallow; badge is optional
      }

      // Load pending order corrections count
      try {
        const corrQ = query(collection(db, 'order-status-corrections'), where('status', '==', 'pending'));
        const corrSnap = await getCountFromServer(corrQ);
        if (!cancelled) setCorrectionsPendingCount(corrSnap.data().count);
      } catch (e) {
        // optional
      }

      // Load pending seller approvals count
      try {
        const sellerRegsRef = collection(db, 'seller-registrations');
        const pendingSellerQ = query(sellerRegsRef, where('status', '==', 'pending'));
        const pendingSellerSnap = await getCountFromServer(pendingSellerQ);
        if (!cancelled) setSellerPendingCount(pendingSellerSnap.data().count);
      } catch (e) {
        // optional
      }

      // Load unpublished products count
      try {
        const productsRef = collection(db, 'products');
        const totalSnap = await getCountFromServer(productsRef);
        const publishedTrueQ = query(productsRef, where('published', '==', true));
        const publishedTrueSnap = await getCountFromServer(publishedTrueQ);
        const unpublished = Math.max(0, (totalSnap.data().count || 0) - (publishedTrueSnap.data().count || 0));
        if (!cancelled) setUnpublishedProductsCount(unpublished);
      } catch (e) {
        // optional
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Define navigation items
  const navItems = [
    {
      path: '/admin-dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1"/>
        <rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/>
        <rect width="7" height="5" x="3" y="14" rx="1"/>
      </svg>
      ),
      count: null
    },
    {
      path: '/admin/seller-approvals',
      label: 'Seller Approvals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11 3 6v14a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
      count: sellerPendingCount
    },
    {
      path: '/admin/helping-hands',
      label: 'Helping Hands',
      icon: <HeartHandshake className="h-4 w-4" />,
      count: hhCount
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      count: null
    },
    {
      path: '/admin/orders',
      label: 'Orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <path d="M3 6h18"></path>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
      count: null
    },
    {
      path: '/admin/order-corrections',
      label: 'Order Corrections',
      icon: <Wrench className="h-4 w-4" />,
      count: correctionsPendingCount
    },
    {
      path: '/admin/products',
      label: 'Products',
      icon: (
        <PackagePlus className="h-4 w-4" />
      ),
      count: unpublishedProductsCount
    },
    {
      path: '/admin/promotions',
      label: 'Promotions',
      icon: (
        <Megaphone className="h-4 w-4" />
      ),
      count: null
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gradient-to-r from-gold/30 via-amber-400/40 to-gold/30 bg-gradient-to-r from-background/85 via-background/90 to-background/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60 shadow-2xl shadow-gold/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold/5 before:to-transparent before:pointer-events-none">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center min-w-0">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard')}
            aria-label="Go to Admin Dashboard"
            className="flex items-center space-x-3 group relative"
          >
            <div className="relative">
              <img src={logo} alt="Logo" className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-lg" />
              <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-amber-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl -z-10"></div>
            </div>
            <div className="relative hidden md:block">
              <span className="text-lg font-bold text-transparent bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text tracking-wide uppercase transition-all duration-300 group-hover:scale-105 whitespace-nowrap">
                Admin
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-amber-400 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation (icon-only, no sliding) */}
        <div className="hidden md:flex mx-auto">
          <div
            className="flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-2xl px-3.5 py-1.5 border border-white/10 shadow-xl"
          >
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 w-11 h-11 rounded-xl transition-all duration-300 hover:text-white hover:scale-110 hover:bg-gradient-to-r hover:from-gold hover:to-amber-400 hover:shadow-lg hover:shadow-gold/30 ${
                    path === item.path ? 'text-white bg-gradient-to-r from-gold to-amber-400 shadow-lg shadow-gold/30' : 'text-foreground hover:text-white'
                  }`}
                  onClick={() => navigate(item.path)}
                  aria-current={path === item.path ? 'page' : undefined}
                  aria-label={item.label}
                >
                  <span className="transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                  {item.count !== null && item.count > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold animate-pulse">
                      {item.count}
                    </span>
                  )}
                </Button>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-gradient-to-r from-black/90 to-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl border border-white/10 opacity-0 scale-75 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu button and user controls */}
        <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/10 shadow-xl">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden relative h-12 w-12 hover:bg-gradient-to-r hover:from-gold hover:to-amber-400 hover:text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 rounded-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white flex items-center justify-center font-bold animate-pulse shadow-lg">
                {totalNotifications}
              </span>
            )}
          </Button>

          {/* User profile and logout */}
          <div className="flex items-center space-x-1">
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-sm h-12 px-3 hover:bg-gradient-to-r hover:from-gold hover:to-amber-400 hover:text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 rounded-xl"
                  aria-label="Admin menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="hidden sm:inline font-semibold">Admin</span>
                </Button>
                <div className="absolute right-0 mt-1 w-48 bg-card rounded-md shadow-lg border border-border overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      to="/admin/analytics"
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-gradient-to-r hover:from-gold/10 hover:to-amber-400/10 hover:text-gold transition-colors"
                    >
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" x2="18" y1="20" y2="10"></line>
                        <line x1="12" x2="12" y1="20" y2="4"></line>
                        <line x1="6" x2="6" y1="20" y2="14"></line>
                      </svg>
                      Analytics
                    </Link>
                  </div>
                </div>
              </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              aria-label="Logout"
              className="h-12 w-12 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-red-300 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-gold/20">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`justify-start text-left transition-all duration-300 rounded-xl px-4 py-3 ${
                  path === item.path ? 'bg-gradient-to-r from-gold to-amber-400 text-white shadow-lg shadow-gold/30' : 'hover:bg-gradient-to-r hover:from-gold/10 hover:to-amber-400/10 hover:text-gold'
                }`}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                  {item.count !== null && item.count > 0 && (
                    <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold animate-pulse">
                      {item.count}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}


// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Also use setTimeout to ensure it happens after any rendering
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return null;
}

function RoutedApp({ showSellerModal, setShowSellerModal, isSellerApproved }: { showSellerModal: boolean; setShowSellerModal: (v: boolean) => void; isSellerApproved: boolean; }) {
  const location = useLocation();
  const { user } = useStore();
  const isSellerRoute = location.pathname.startsWith('/seller');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showAdminNavbar = isAdminRoute && location.pathname !== '/admin-login';

  return (
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
         {!(isSellerRoute || isAdminRoute) && (
          <Header onOpenSellerModal={() => setShowSellerModal(true)} />
        )}
        {showAdminNavbar && <AdminNavbar />}
        <AnimatePresence mode="wait">
          <Routes>
            {/* Authentication routes first */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Seller routes */}
            <Route path="/seller-registration" element={<SellerRegistration />} />
            <Route path="/seller-agreement" element={<SellerAgreement />} />
            {/* Seller portal entry and guarded seller routes */}
            <Route path="/seller-portal" element={<SellerPortal />} />
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/seller" element={
              <RequireSellerPortal>
                <SellerLayout />
              </RequireSellerPortal>
            }>
              <Route index element={<SellerDashboard />} />
              <Route path="orders" element={<SellerOrdersPage />} />
              <Route path="customizations" element={<SellerCustomizations />} />
              <Route path="customizations/:chatId" element={<SellerCustomizeChat />} />
              <Route path="upload/charity-craft" element={<CharityCraftUpload />} />
              <Route path="upload/organic-store" element={<OrganicStoreUpload />} />
              <Route path="upload/scrap-store" element={<ScrapStoreUpload />} />
              <Route path="upload/moms-made-united" element={<MomsMadeUnitedUpload />} />
              <Route path="upload/green-cup-challenge" element={<GreenCupChallengeUpload />} />
              <Route path="upload/charity-bakes" element={<CharityBakesUpload />} />
              <Route path="upload/home-decor" element={<HomeDecorUpload />} />
              <Route path="upload/packed-food" element={<PackedFoodUpload />} />
              <Route path="upload/home-plants" element={<HomePlantsUpload />} />
              <Route path="upload/beauty-homemade" element={<BeautyHomemadeUpload />} />
              <Route path="upload/homemade-households" element={<HomemadeHouseholdsUpload />} />
              <Route path="upload/birthday-gifts" element={<BirthdayGiftsUpload />} />
              <Route path="upload/scrap-books" element={<ScrapBooksUpload />} />
              <Route path="allproducts" element={<AllProducts />} />
              {/* <Route path="upload/:category" element={<SellerUploadRedirect />} /> */}
              <Route path="promotions" element={<SellerPromotionsPage />} />
              <Route path="promotions/checkout" element={<SellerPromotionsCheckout />} />
            </Route>
            
            {/* Backwards compatibility */}
            <Route path="/seller-dashboard" element={<Navigate to="/seller" replace />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/seller-approvals" element={<AdminSellerApprovals />} />
            <Route path="/admin/helping-hands" element={<AdminHelpingHandsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/order-corrections" element={<AdminOrderCorrectionsPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
            <Route path="/admin/product/:id" element={<ProductDetailsPage />} />
            <Route path="/admin/sellers/:sellerId/products" element={<SellerProductsPage />} />
            
            {/* Analytics route moved to admin dropdown */}
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/category-requests" element={<CategoryRequestsPage />} />
            
            {/* Main routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/saved" element={<SaveForLaterPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/green-cup" element={<GreenCupChallengePage />} />
            <Route path="/helping-hands" element={<HelpingHandsPage />} />
            <Route path="/helping-hands/register" element={<HelpingHandsRegister />} />
            <Route path="/category/home-plants" element={<HomePlantPage />} />
            <Route path="/category/charity-craft" element={<CharityCraftPage />} />
            
            <Route path="/category/scrap-store" element={<ScrapStorePage />} />
            <Route path="/category/moms-made-united" element={<MomsMadeUnitedPage />} />
            <Route path="/category/packed-food" element={<PackedFoodPage />} />
            <Route path="/category/birthday-gifts" element={<BirthdayGiftsPage />} />
            <Route path="/category/homemade-households" element={<HomemadeHouseholdsPage />} />
            <Route path="/category/charity-bakes" element={<CharityBakesPage />} />
            <Route path="/charity-bakes" element={<Navigate to="/category/charity-bakes" replace />} />
            <Route path="/category/beauty-homemade" element={<BeautyProductsPage />} />
            <Route path="/category/organic-store" element={<OrganicStorePage />} />
            <Route path="/category/home-decor" element={<HomeDecorPage />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/category/scrap-books" element={<ScrapStoreBooks />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            {/* <Route path="/scrap-books" element={<ScrapStoreBooks />} /> */}
            <Route path="/buyer/customizations" element={<UserCustomizations />} />
            <Route path="/customize/:productId" element={<CustomizeChat />} />
            
            {/* Payment routes */}
            <Route path="/payment/card" element={<CardPaymentPage />} />
            <Route path="/checkout/details" element={<CheckoutDetailsPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/faq" element={<ComingSoonPage title="FAQ" />} />
            <Route path="/become-seller" element={
              !user ? (
                <Navigate to="/login?redirect=/become-seller" replace />
              ) : (user as any).role === 'seller' ? (
                <Navigate to="/seller-portal" replace />
              ) : (
                <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Become a Seller</h1>
                    <p className="text-muted-foreground text-lg mb-6">Join our platform as a seller and start selling your products.</p>
                    <Button 
                      onClick={() => setShowSellerModal(true)}
                      className="bg-gold hover:bg-gold/90 text-black"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )
            } />
            <Route path="/team" element={<ComingSoonPage title="Meet our Team" />} />
            <Route path="/portal" element={<ComingSoonPage title="Official Portal" />} />
            <Route path="/sellers" element={<RegisteredSellersPage />} />
            <Route path="/groups" element={<ComingSoonPage title="Group List" />} />
            <Route path="/community-kitchen" element={<ComingSoonPage title="Smile Community Kitchen" />} />
            <Route path="/loyalty" element={<ComingSoonPage title="SCK Smile Loyalty" />} />
            <Route path="/refer" element={<ReferFriends />} />
            <Route path="/reservations" element={<ComingSoonPage title="SKC Reservations" />} />
            <Route path="/pricing" element={<ComingSoonPage title="Plans and Pricing" />} />
            <Route path="/irinjalakuda" element={<ComingSoonPage title="SCK Irinjalakuda Mothers" />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AnimatePresence>
        {!(isSellerRoute || isAdminRoute) && <Footer />}
        {!(isSellerRoute || isAdminRoute) && <InstallPrompt />}
        {!(isSellerRoute || isAdminRoute) && (
          <SellerModal 
            isOpen={showSellerModal} 
            onClose={() => setShowSellerModal(false)} 
            isApproved={isSellerApproved}
          />
        )}
        {!isSellerRoute && !isAdminRoute && <AdminNav />}
      </div>
  );
}     

export default App;
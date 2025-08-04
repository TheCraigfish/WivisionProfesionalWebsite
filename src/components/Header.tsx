import React, { useState } from 'react';
import { Menu, X, Shield, Phone, Mail, Palette, Moon, Sun, ChevronDown } from 'lucide-react';

interface HeaderProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, isDarkMode, onDarkModeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'trials' | 'partner' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Company Info
    company: '',
    companySize: '',
    country: '',
    partnerStatus: '',
    // Step 2 - Contact Info
    firstName: '',
    lastName: '',
    businessEmail: '',
    businessPhone: '',
    additionalInfo: '',
    emailConsent: false
  });

  const themeColors = {
    teal: 'text-teal-600',
    blue: 'text-[#2d7384]',
    cyan: 'text-[#12efd5]'
  };

  const hoverColors = {
    teal: 'hover:text-teal-600',
    blue: 'hover:text-[#2d7384]',
    cyan: 'hover:text-[#12efd5]'
  };

  const openModal = (modalType: 'trials' | 'partner') => {
    setActiveModal(modalType);
    setCurrentStep(1);
    setFormData({
      company: '',
      companySize: '',
      country: '',
      partnerStatus: '',
      firstName: '',
      lastName: '',
      businessEmail: '',
      businessPhone: '',
      additionalInfo: '',
      emailConsent: false
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    setCurrentStep(1);
    document.body.style.overflow = 'unset';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    closeModal();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (activeModal) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeModal]);

  return (
    <>
      <header className={`${isDarkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white'} shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/WiVison_Primary_Logo.png" 
                alt="WiVision" 
                className="h-16 w-auto"
              />
            </div>
            
            <nav className="hidden md:flex items-center space-x-6 ml-48">
              <button onClick={() => scrollToSection('home')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-colors`}>Home</button>
              <button onClick={() => scrollToSection('services')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-colors`}>Services</button>
              <button onClick={() => scrollToSection('about')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-colors`}>About</button>
              <button onClick={() => scrollToSection('solutions')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-colors`}>Solutions</button>
              <button onClick={() => scrollToSection('contact')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-colors`}>Contact</button>
            </nav>

            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <button onClick={() => scrollToSection('contact')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5`}>
                Support
              </button>
              <button onClick={() => openModal('trials')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5`}>
                Free Trials
              </button>
              <button onClick={() => openModal('partner')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5`}>
                Become a Partner
              </button>
              <button
                onClick={onDarkModeToggle}
                className={`p-2 rounded-lg ${themeColors[theme]} ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`} /> : <Menu className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className={`md:hidden py-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-t`}>
              <nav className="flex flex-col space-y-4">
                <button onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Home</button>
                <button onClick={() => { scrollToSection('services'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Services</button>
                <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>About</button>
                <button onClick={() => { scrollToSection('solutions'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Solutions</button>
                <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Contact</button>
                <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Support</button>
                <button onClick={() => openModal('trials')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Free Trials</button>
                <button onClick={() => openModal('partner')} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${hoverColors[theme]} font-medium text-left`}>Become a Partner</button>
                <button
                  onClick={onDarkModeToggle}
                  className={`flex items-center ${themeColors[theme]} font-medium`}
                >
                  {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modal Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeModal === 'trials' ? 'Start Your Free Trial' : 'Become a Partner'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="h-6 w-6 text-slate-600" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    1
                  </div>
                  <div className="w-16 h-0.5 bg-slate-200"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    2
                  </div>
                </div>
              </div>

              {/* Step Labels */}
              <div className="flex justify-between mb-8 text-sm text-slate-600">
                <span className={currentStep === 1 ? 'font-medium text-slate-900' : ''}>COMPANY INFO</span>
                <span className={currentStep === 2 ? 'font-medium text-slate-900' : ''}>
                  {activeModal === 'trials' ? 'CONTACT INFO FOR TRIAL USER' : 'CONTACT INFO FOR PARTNER'}
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1 - Company Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company Size *
                      </label>
                      <div className="relative">
                        <select
                          name="companySize"
                          required
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 appearance-none"
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1001-5000">1001-5000 employees</option>
                          <option value="5000+">5000+ employees</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Country *
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 appearance-none"
                        >
                          <option value="">Select country</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {activeModal === 'partner' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Are you a partner or distributor?
                        </label>
                        <div className="relative">
                          <select
                            name="partnerStatus"
                            value={formData.partnerStatus}
                            onChange={handleInputChange}
                            className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 appearance-none"
                          >
                            <option value="">Select status</option>
                            <option value="No">No</option>
                            <option value="Yes - Partner">Yes - Partner</option>
                            <option value="Yes - Distributor">Yes - Distributor</option>
                            <option value="Interested in becoming one">Interested in becoming one</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 - Contact Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Business Email
                      </label>
                      <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Business Phone
                      </label>
                      <input
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional information
                      </label>
                      <textarea
                        name="additionalInfo"
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-slate-300 focus:border-slate-900 focus:ring-0 bg-transparent text-slate-900 placeholder-slate-400 resize-none"
                        placeholder=""
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="emailConsent"
                        id="emailConsent"
                        checked={formData.emailConsent}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-orange-400 focus:ring-orange-400 border-slate-300 rounded"
                      />
                      <label htmlFor="emailConsent" className="text-sm text-slate-600 leading-relaxed">
                        I would like to receive emails and equivalent communications from WithSecure, including newsletters, event invitations, offers and product-related information.
                      </label>
                    </div>

                    <div className="text-sm text-slate-600 leading-relaxed">
                      We process the personal data you share with us in accordance with our{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Corporate Business Privacy Policy
                      </a>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        {activeModal === 'trials' ? 'Start Trial' : 'Submit Application'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
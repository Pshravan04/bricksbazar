'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Save,
  Building2,
  Home,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Camera,
  FileText,
  UserCheck,
  AlertCircle,
  Eye,
  RefreshCw,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/lib/utils';
import { ListingType, PropertyCategory, BHKType, PostedBy } from '@/types';

export interface PropertyFormData {
  // Step 1: Listing Type
  listingType: ListingType;
  // Step 2: Category
  category: 'Residential' | 'Commercial' | 'Land / Plot';
  // Step 3: Specific Type
  propertyCategory: PropertyCategory;
  // Step 4: City & Locality
  city: string;
  locality: string;
  address: string;
  pincode: string;
  landmark: string;
  // Step 5: Project / Society Name
  projectName: string;
  // Step 6: BHK & Layout
  bhk: BHKType;
  bathrooms: number;
  balconies: number;
  // Step 7: Area details
  superBuiltUpArea: number;
  carpetArea: number;
  builtUpArea: number;
  // Step 8: Floor details
  floorNumber: number;
  totalFloors: number;
  facing: string;
  furnishing: string;
  possessionStatus: string;
  // Step 9: Pricing
  price: number;
  maintenanceCharges: number;
  securityDeposit: number;
  isNegotiable: boolean;
  // Step 10: Amenities
  amenities: string[];
  // Step 11: Photos
  photos: { url: string; caption: string; isCover: boolean }[];
  // Step 12: Description
  title: string;
  description: string;
  highlights: string[];
  // Step 13: Contact Details
  postedBy: PostedBy;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  reraNumber?: string;
  bestTimeToContact: string;
  // Step 14: Terms
  agreedToTerms: boolean;
}

const DEFAULT_FORM_DATA: PropertyFormData = {
  listingType: 'buy',
  category: 'Residential',
  propertyCategory: 'Apartment',
  city: 'Mumbai',
  locality: 'Bandra West',
  address: 'Hill Road, Near Mehboob Studios',
  pincode: '400050',
  landmark: 'Opposite Bandra Police Station',
  projectName: 'Hill View Luxury Heights',
  bhk: '3 BHK',
  bathrooms: 3,
  balconies: 2,
  superBuiltUpArea: 1850,
  carpetArea: 1420,
  builtUpArea: 1650,
  floorNumber: 12,
  totalFloors: 24,
  facing: 'North-East',
  furnishing: 'Semi-Furnished',
  possessionStatus: 'Ready to Move',
  price: 48500000,
  maintenanceCharges: 12000,
  securityDeposit: 0,
  isNegotiable: true,
  amenities: [
    'Swimming Pool',
    'Gymnasium',
    '24/7 Security & CCTV',
    'Covered Car Parking',
    'Club House',
    'Power Backup',
    'High Speed Elevators',
    'Piped Gas Connection',
  ],
  photos: [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Living Room with Balcony Deck',
      isCover: true,
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      caption: 'Master Bedroom',
      isCover: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Modular Italian Kitchen',
      isCover: false,
    },
  ],
  title: 'Ultra Luxurious 3 BHK with Panoramic Arabian Sea Views in Bandra West',
  description:
    'Experience premier coastal living in this meticulously designed 3 BHK home on a higher floor in Bandra West. Boasting double-height ceilings, cross-ventilation, imported marble flooring, and access to an exclusive 25,000 sq.ft clubhouse with infinity pool.',
  highlights: [
    'Full Sea View from Master Bedroom and Balcony',
    'Vastu Compliant North-East Entry',
    '2 Dedicated Covered Basement Parking Slots',
    'Gated Society with Tier-1 Security Management',
  ],
  postedBy: 'Agent',
  contactName: 'Vikramaditya Singhania',
  contactPhone: '9820098200',
  contactEmail: 'vikram.singhania@bricksbazar.com',
  reraNumber: 'A51900028941',
  bestTimeToContact: '10:00 AM - 7:00 PM',
  agreedToTerms: true,
};

const STEPS = [
  { id: 1, title: 'Purpose', shortTitle: 'Purpose' },
  { id: 2, title: 'Category', shortTitle: 'Category' },
  { id: 3, title: 'Property Type', shortTitle: 'Type' },
  { id: 4, title: 'Location', shortTitle: 'Location' },
  { id: 5, title: 'Society/Project', shortTitle: 'Project' },
  { id: 6, title: 'BHK & Rooms', shortTitle: 'Rooms' },
  { id: 7, title: 'Area Specs', shortTitle: 'Area' },
  { id: 8, title: 'Floor & Facing', shortTitle: 'Floor' },
  { id: 9, title: 'Pricing', shortTitle: 'Pricing' },
  { id: 10, title: 'Amenities', shortTitle: 'Amenities' },
  { id: 11, title: 'Photos', shortTitle: 'Photos' },
  { id: 12, title: 'Description', shortTitle: 'Details' },
  { id: 13, title: 'Contact Info', shortTitle: 'Contact' },
  { id: 14, title: 'Review & Post', shortTitle: 'Review' },
];

const AVAILABLE_AMENITIES = [
  'Swimming Pool',
  'Gymnasium',
  '24/7 Security & CCTV',
  'Covered Car Parking',
  'Club House',
  'Power Backup',
  'High Speed Elevators',
  'Piped Gas Connection',
  'Jogging Track',
  'Children Play Area',
  'Rainwater Harvesting',
  'Vastu Compliant',
  'EV Charging Station',
  'Intercom Facility',
  'Landscaped Gardens',
  'Fire Fighting Systems',
];

const INDIAN_METROS = ['Mumbai', 'Pune', 'Thane', 'Navi Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Chennai'];

export default function PostPropertyWizard() {
  const router = useRouter();
  const { toast, success, error: toastError, info } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PropertyFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newHighlight, setNewHighlight] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('bb_property_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem('bb_property_draft', JSON.stringify(formData));
      success('Draft Saved', 'Property listing draft saved successfully to local storage');
    } catch {
      toastError('Save Failed', 'Failed to save draft locally');
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem('bb_property_draft');
      setFormData(DEFAULT_FORM_DATA);
      setCurrentStep(1);
      info('Draft Reset', 'Form cleared and reset to defaults');
    } catch {
      // ignore
    }
  };

  // Validation function per step
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 4) {
      if (!formData.city.trim()) errs.city = 'City is required';
      if (!formData.locality.trim()) errs.locality = 'Locality is required';
      if (!formData.address.trim()) errs.address = 'Street address is required';
      if (!formData.pincode || formData.pincode.length !== 6) errs.pincode = 'Valid 6-digit Indian Pincode required';
    }

    if (step === 5) {
      if (!formData.projectName.trim()) errs.projectName = 'Project or Society name is required';
    }

    if (step === 7) {
      if (!formData.superBuiltUpArea || formData.superBuiltUpArea <= 0) {
        errs.superBuiltUpArea = 'Super built-up area must be greater than 0';
      }
      if (!formData.carpetArea || formData.carpetArea <= 0) {
        errs.carpetArea = 'Carpet area must be greater than 0';
      }
    }

    if (step === 9) {
      if (!formData.price || formData.price <= 0) {
        errs.price = 'Expected price or rent must be greater than 0';
      }
    }

    if (step === 11) {
      if (formData.photos.length === 0) {
        errs.photos = 'Please provide at least one photo for your listing';
      }
    }

    if (step === 12) {
      if (!formData.title.trim() || formData.title.length < 15) {
        errs.title = 'Title must be at least 15 characters long';
      }
      if (!formData.description.trim() || formData.description.length < 30) {
        errs.description = 'Description must be at least 30 characters long';
      }
    }

    if (step === 13) {
      if (!formData.contactName.trim()) errs.contactName = 'Contact name is required';
      if (!formData.contactPhone || !/^[6-9]\d{9}$/.test(formData.contactPhone)) {
        errs.contactPhone = 'Valid 10-digit Indian mobile number required';
      }
      if (!formData.contactEmail.includes('@')) {
        errs.contactEmail = 'Valid email address required';
      }
      if (formData.postedBy !== 'Owner' && !formData.reraNumber?.trim()) {
        errs.reraNumber = 'RERA Registration Number is required for Agents/Builders in India';
      }
    }

    if (step === 14) {
      if (!formData.agreedToTerms) {
        errs.terms = 'You must agree to the listing terms and verification guidelines';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 14) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      toastError('Validation Error', 'Please resolve the highlighted fields before continuing');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePublish = () => {
    if (!validateStep(14)) {
      toastError('Terms Required', 'Please accept the listing terms before publishing');
      return;
    }

    const mockId = `BB-${formData.city.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionId(mockId);
    setIsSubmitted(true);
    localStorage.removeItem('bb_property_draft');
    success('Listing Submitted', `Listing ${mockId} submitted successfully for verification!`);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter((a) => a !== amenity) : [...prev.amenities, amenity],
      };
    });
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  const addPhoto = () => {
    if (newPhotoUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        photos: [
          ...prev.photos,
          {
            url: newPhotoUrl.trim(),
            caption: newPhotoCaption.trim() || 'Property View',
            isCover: prev.photos.length === 0,
          },
        ],
      }));
      setNewPhotoUrl('');
      setNewPhotoCaption('');
    }
  };

  const removePhoto = (idx: number) => {
    setFormData((prev) => {
      const updated = prev.photos.filter((_, i) => i !== idx);
      if (updated.length > 0 && !updated.some((p) => p.isCover)) {
        updated[0].isCover = true;
      }
      return { ...prev, photos: updated };
    });
  };

  const setCoverPhoto = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.map((p, i) => ({
        ...p,
        isCover: i === idx,
      })),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Top Header Navigation */}
      <div className="bg-white border-b border-[#EAEAEA] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg text-[#777777] hover:text-[#252525] hover:bg-gray-100 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#252525]">Post New Property</h1>
                <Badge variant="outline" size="sm">
                  14-Step Wizard
                </Badge>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3 h-3" /> Demo Mode
                </span>
              </div>
              <p className="text-xs text-[#777777]">
                Step {currentStep} of 14: <span className="font-medium text-[#252525]">{STEPS[currentStep - 1].title}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearDraft} className="text-[#777777] hover:text-red-600">
              <Trash2 className="w-4 h-4 mr-1.5" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={saveDraft}>
              <Save className="w-4 h-4 mr-1.5" /> Save Draft
            </Button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-[#EAEAEA] h-1.5 overflow-hidden">
          <div
            className="bg-[#C6383B] h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 14) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Step Navigation Pill Carousel */}
        <div className="bg-white rounded-xl border border-[#EAEAEA] p-3 mb-8 shadow-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {STEPS.map((s) => {
              const isPast = s.id < currentStep;
              const isCurrent = s.id === currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    if (s.id < currentStep) {
                      setCurrentStep(s.id);
                    }
                  }}
                  disabled={s.id > currentStep}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-[#C6383B] text-white shadow-xs'
                      : isPast
                      ? 'bg-[#FCEEEF] text-[#C6383B] hover:bg-[#C6383B]/20 cursor-pointer'
                      : 'text-[#777777] bg-gray-50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-[#C6383B]'
                        : isPast
                        ? 'bg-[#C6383B] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isPast ? '✓' : s.id}
                  </span>
                  <span>{s.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Step Content */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs p-6 sm:p-8 md:p-10 mb-8">
          {/* STEP 1: Purpose (Sell or Rent) */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 1: What would you like to do?</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Choose whether you are listing this property for sale or putting it on lease/rent.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'buy' })}
                  className={`p-6 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                    formData.listingType === 'buy'
                      ? 'border-[#C6383B] bg-[#FCEEEF]/40 shadow-xs'
                      : 'border-[#EAEAEA] hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-red-100 text-[#C6383B] rounded-xl">
                      <Home className="w-6 h-6" />
                    </span>
                    {formData.listingType === 'buy' && (
                      <CheckCircle2 className="w-6 h-6 text-[#C6383B]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">Sell / Resale Property</h3>
                    <p className="text-xs text-[#777777] mt-1">
                      Post an apartment, villa, independent house, or commercial asset for outright sale.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'rent' })}
                  className={`p-6 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                    formData.listingType === 'rent'
                      ? 'border-[#C6383B] bg-[#FCEEEF]/40 shadow-xs'
                      : 'border-[#EAEAEA] hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-red-100 text-[#C6383B] rounded-xl">
                      <Building2 className="w-6 h-6" />
                    </span>
                    {formData.listingType === 'rent' && (
                      <CheckCircle2 className="w-6 h-6 text-[#C6383B]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#252525]">Rent / Lease Out</h3>
                    <p className="text-xs text-[#777777] mt-1">
                      Find verified, high-credit tenants for your residential apartment, flat, or commercial space.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Property Category */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 2: Property Category</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Select the broad zoning classification for this property.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    id: 'Residential',
                    desc: 'Apartments, villas, floors, penthouses, gated communities',
                    icon: Home,
                  },
                  {
                    id: 'Commercial',
                    desc: 'Offices, retail shops, showrooms, warehouses, co-working',
                    icon: Building2,
                  },
                  {
                    id: 'Land / Plot',
                    desc: 'Residential NA plots, agricultural land, industrial plots',
                    icon: MapPin,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: item.id as any,
                        propertyCategory:
                          item.id === 'Residential'
                            ? 'Apartment'
                            : item.id === 'Commercial'
                            ? 'Commercial Office'
                            : 'Plot / Land',
                      })
                    }
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      formData.category === item.id
                        ? 'border-[#C6383B] bg-[#FCEEEF]/40 shadow-xs'
                        : 'border-[#EAEAEA] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <item.icon className="w-6 h-6 text-[#C6383B]" />
                      {formData.category === item.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#C6383B]" />
                      )}
                    </div>
                    <h3 className="font-bold text-[#252525]">{item.id}</h3>
                    <p className="text-xs text-[#777777] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Specific Property Type */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 3: Specific Property Type</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Categorized under <span className="font-semibold text-[#252525]">{formData.category}</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {(formData.category === 'Residential'
                  ? ['Apartment', 'Villa', 'Independent House', 'Penthouse']
                  : formData.category === 'Commercial'
                  ? ['Commercial Office', 'Commercial Shop', 'Warehouse']
                  : ['Plot / Land']
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyCategory: type as PropertyCategory })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.propertyCategory === type
                        ? 'border-[#C6383B] bg-[#FCEEEF]/40 font-bold text-[#C6383B]'
                        : 'border-[#EAEAEA] hover:border-gray-300 bg-white text-[#252525]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{type}</span>
                      {formData.propertyCategory === type && (
                        <CheckCircle2 className="w-4 h-4 text-[#C6383B]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: City and Locality */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 4: Location & Address</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Accurate locality details ensure high-intent buyers discover your listing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Metropolitan City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  options={INDIAN_METROS.map((city) => ({ value: city, label: city }))}
                  error={errors.city}
                />
                <Input
                  label="Locality / Neighborhood *"
                  placeholder="e.g. Bandra West, Whitefield, Baner"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  error={errors.locality}
                />
              </div>

              <Input
                label="Complete Street Address *"
                placeholder="Flat / Unit No, Wing, Street / Road Name"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                error={errors.address}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Pincode (6 Digits) *"
                  placeholder="e.g. 400050"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  error={errors.pincode}
                />
                <Input
                  label="Prominent Landmark"
                  placeholder="e.g. Near Mehboob Studios / Metro Pillar 42"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Project or Society Name */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 5: Project / Society Name</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Specify the cooperative housing society, standalone tower, or branded builder project.
                </p>
              </div>

              <Input
                label="Project or Cooperative Society Name *"
                placeholder="e.g. Lodha World Towers / Hill View CHSL"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                error={errors.projectName}
                helperText="Buyers frequently search directly by society name."
              />

              <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#21865B] mt-0.5 shrink-0" />
                <p className="text-xs text-[#777777]">
                  BricksBazar verifies registered RERA project boundaries to auto-populate civic connectivity ratings and nearby school/hospital indices.
                </p>
              </div>
            </div>
          )}

          {/* STEP 6: BHK Configuration */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 6: Bedroom, Bathroom & Balcony Setup</h2>
                <p className="text-sm text-[#777777] mt-1">Specify room counts and configuration.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-2">BHK Configuration *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {(['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Studio'] as BHKType[]).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, bhk: b })}
                      className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                        formData.bhk === b
                          ? 'border-[#C6383B] bg-[#C6383B] text-white shadow-xs'
                          : 'border-[#EAEAEA] bg-white text-[#252525] hover:border-gray-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Select
                  label="Total Bathrooms *"
                  value={String(formData.bathrooms)}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  options={[1, 2, 3, 4, 5, 6].map((num) => ({
                    value: String(num),
                    label: `${num} Bathroom${num > 1 ? 's' : ''}`,
                  }))}
                />
                <Select
                  label="Balconies *"
                  value={String(formData.balconies)}
                  onChange={(e) => setFormData({ ...formData, balconies: Number(e.target.value) })}
                  options={[0, 1, 2, 3, 4, 5].map((num) => ({
                    value: String(num),
                    label: `${num} Balcon${num === 1 ? 'y' : 'ies'}`,
                  }))}
                />
              </div>
            </div>
          )}

          {/* STEP 7: Area Details */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 7: Area Measurements</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Specify area details in square feet (sq.ft) in accordance with RERA standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Carpet Area (sq.ft) *"
                  type="number"
                  placeholder="e.g. 1420"
                  value={formData.carpetArea || ''}
                  onChange={(e) => setFormData({ ...formData, carpetArea: Number(e.target.value) })}
                  error={errors.carpetArea}
                  helperText="Usable net floor area (RERA mandatory)"
                />
                <Input
                  label="Super Built-up Area (sq.ft) *"
                  type="number"
                  placeholder="e.g. 1850"
                  value={formData.superBuiltUpArea || ''}
                  onChange={(e) => setFormData({ ...formData, superBuiltUpArea: Number(e.target.value) })}
                  error={errors.superBuiltUpArea}
                  helperText="Includes common areas/loading"
                />
                <Input
                  label="Built-up Area (sq.ft)"
                  type="number"
                  placeholder="e.g. 1650"
                  value={formData.builtUpArea || ''}
                  onChange={(e) => setFormData({ ...formData, builtUpArea: Number(e.target.value) })}
                  helperText="Includes external walls"
                />
              </div>
            </div>
          )}

          {/* STEP 8: Floor & Facing Details */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 8: Floor, Facing & Furnishing</h2>
                <p className="text-sm text-[#777777] mt-1">Specify tower elevations and orientation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Property Floor Number *"
                  type="number"
                  placeholder="e.g. 12"
                  value={formData.floorNumber}
                  onChange={(e) => setFormData({ ...formData, floorNumber: Number(e.target.value) })}
                />
                <Input
                  label="Total Floors in Tower *"
                  type="number"
                  placeholder="e.g. 24"
                  value={formData.totalFloors}
                  onChange={(e) => setFormData({ ...formData, totalFloors: Number(e.target.value) })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Vastu / Facing"
                  value={formData.facing}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  options={[
                    'East',
                    'North',
                    'North-East',
                    'West',
                    'South',
                    'South-East',
                    'North-West',
                  ].map((f) => ({ value: f, label: f }))}
                />
                <Select
                  label="Furnishing Status"
                  value={formData.furnishing}
                  onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                  options={[
                    { value: 'Furnished', label: 'Fully Furnished' },
                    { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                    { value: 'Unfurnished', label: 'Unfurnished' },
                  ]}
                />
                <Select
                  label="Possession Status"
                  value={formData.possessionStatus}
                  onChange={(e) => setFormData({ ...formData, possessionStatus: e.target.value })}
                  options={[
                    { value: 'Ready to Move', label: 'Ready to Move' },
                    { value: 'Under Construction', label: 'Under Construction' },
                    { value: 'New Launch', label: 'New Launch' },
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 9: Pricing */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">
                  Step 9: {formData.listingType === 'buy' ? 'Sale Price' : 'Monthly Rent & Deposit'}
                </h2>
                <p className="text-sm text-[#777777] mt-1">
                  Specify realistic pricing to attract qualified inquiries.
                </p>
              </div>

              <div className="p-4 bg-[#FCEEEF]/50 rounded-xl border border-red-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#777777] font-medium">Display Value in Words:</span>
                  <p className="text-xl font-bold text-[#C6383B]">
                    {formatINR(formData.price)}
                    {formData.listingType === 'rent' && ' / month'}
                  </p>
                </div>
                {formData.superBuiltUpArea > 0 && formData.listingType === 'buy' && (
                  <div className="text-right">
                    <span className="text-xs text-[#777777]">Calculated Rate:</span>
                    <p className="text-sm font-semibold text-[#252525]">
                      ₹{Math.round(formData.price / formData.superBuiltUpArea).toLocaleString('en-IN')} / sq.ft
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={formData.listingType === 'buy' ? 'Expected Total Price (₹) *' : 'Monthly Rent (₹) *'}
                  type="number"
                  placeholder="e.g. 48500000"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  error={errors.price}
                />
                <Input
                  label="Monthly Society Maintenance (₹)"
                  type="number"
                  placeholder="e.g. 12000"
                  value={formData.maintenanceCharges || ''}
                  onChange={(e) => setFormData({ ...formData, maintenanceCharges: Number(e.target.value) })}
                />
              </div>

              {formData.listingType === 'rent' && (
                <Input
                  label="Security Deposit (₹)"
                  type="number"
                  placeholder="e.g. 300000"
                  value={formData.securityDeposit || ''}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                />
              )}

              <div className="pt-2">
                <Checkbox
                  id="negotiable-checkbox"
                  label="Price is slightly negotiable for serious buyers / long-term tenants"
                  checked={formData.isNegotiable}
                  onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
                />
              </div>
            </div>
          )}

          {/* STEP 10: Amenities */}
          {currentStep === 10 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 10: Amenities & Society Facilities</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Properties with 6+ verified amenities receive 3x higher search views.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const selected = formData.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        selected
                          ? 'border-[#C6383B] bg-[#FCEEEF] text-[#C6383B]'
                          : 'border-[#EAEAEA] bg-white text-[#252525] hover:border-gray-300'
                      }`}
                    >
                      <span>{amenity}</span>
                      {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C6383B] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#777777]">
                Selected {formData.amenities.length} amenities
              </p>
            </div>
          )}

          {/* STEP 11: Photos */}
          {currentStep === 11 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 11: Property Photos & Visuals</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Upload architectural photos of rooms, balcony views, kitchen, and exterior facades.
                </p>
              </div>

              {errors.photos && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errors.photos}
                </div>
              )}

              {/* Photo Upload Simulation Box */}
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center">
                <Camera className="w-10 h-10 text-[#777777] mb-2" />
                <p className="text-sm font-semibold text-[#252525]">Add High-Resolution Image URL</p>
                <p className="text-xs text-[#777777] mb-4">Paste image URL or preview architectural sample</p>
                <div className="w-full max-w-lg flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Caption (e.g. Master Bedroom)"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="text-xs"
                  />
                  <Button variant="primary" size="sm" onClick={addPhoto} className="shrink-0">
                    <Upload className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              {/* Photos Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {formData.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-[#EAEAEA] bg-white shadow-xs"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {photo.isCover && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#C6383B] text-white text-[10px] font-bold rounded shadow-xs">
                        COVER PHOTO
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                      <span className="truncate text-[#252525] font-medium">{photo.caption}</span>
                      {!photo.isCover && (
                        <button
                          type="button"
                          onClick={() => setCoverPhoto(idx)}
                          className="text-[11px] text-[#C6383B] hover:underline font-semibold"
                        >
                          Make Cover
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 12: Description */}
          {currentStep === 12 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 12: Title & Detailed Description</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Craft an editorial headline and descriptive overview highlighting unique features.
                </p>
              </div>

              <Input
                label="Listing Headline *"
                placeholder="e.g. Ultra Luxurious 3 BHK with Sea View in Bandra West"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
              />

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe property condition, ventilation, sunlight, society culture, and immediate vicinity..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#252525] placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#C6383B] ${
                    errors.description ? 'border-red-500' : 'border-[#EAEAEA]'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                )}
              </div>

              {/* Key Highlights Bullet Points */}
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-2">
                  Key Selling Highlights
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g. Vastu Compliant North-East Entry"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="text-xs"
                  />
                  <Button variant="outline" size="sm" onClick={addHighlight} className="shrink-0">
                    Add Highlight
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-[#252525]"
                    >
                      <span>✓ {h}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 13: Contact Details */}
          {currentStep === 13 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 13: Lister Profile & Contact</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Prospective buyers and verified tenants will connect via these details.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-2">You are posting as: *</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Owner', 'Agent', 'Builder'] as PostedBy[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, postedBy: role })}
                      className={`p-3 rounded-xl border text-center text-sm font-bold transition-all ${
                        formData.postedBy === role
                          ? 'border-[#C6383B] bg-[#C6383B] text-white shadow-xs'
                          : 'border-[#EAEAEA] bg-white text-[#252525] hover:border-gray-300'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Person Full Name *"
                  placeholder="e.g. Vikramaditya Singhania"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  error={errors.contactName}
                />
                <Input
                  label="10-Digit Mobile Number *"
                  placeholder="e.g. 9820098200"
                  maxLength={10}
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value.replace(/\D/g, '') })}
                  error={errors.contactPhone}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address *"
                  placeholder="e.g. vikram@domain.com"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  error={errors.contactEmail}
                />
                <Input
                  label="Preferred Contact Hours"
                  placeholder="e.g. 10:00 AM - 7:00 PM"
                  value={formData.bestTimeToContact}
                  onChange={(e) => setFormData({ ...formData, bestTimeToContact: e.target.value })}
                />
              </div>

              {formData.postedBy !== 'Owner' && (
                <Input
                  label="MahaRERA / State RERA Registration Number *"
                  placeholder="e.g. A51900028941"
                  value={formData.reraNumber || ''}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  error={errors.reraNumber}
                  helperText="Required by RERA regulations for all non-owner listings."
                />
              )}
            </div>
          )}

          {/* STEP 14: Review & Publish */}
          {currentStep === 14 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#252525]">Step 14: Review & Publish Listing</h2>
                <p className="text-sm text-[#777777] mt-1">
                  Double check your submission summary before pushing to moderation.
                </p>
              </div>

              {/* Master Summary Card */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-[#EAEAEA] space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#C6383B] uppercase tracking-wider">
                      {formData.listingType === 'buy' ? 'For Sale' : 'For Rent'} • {formData.propertyCategory}
                    </span>
                    <h3 className="text-xl font-bold text-[#252525] mt-0.5">{formData.title}</h3>
                    <p className="text-xs text-[#777777] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C6383B]" />
                      {formData.projectName}, {formData.locality}, {formData.city} - {formData.pincode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#C6383B]">{formatINR(formData.price)}</p>
                    <p className="text-xs text-[#777777]">
                      {formData.superBuiltUpArea} sq.ft (₹
                      {Math.round(formData.price / formData.superBuiltUpArea).toLocaleString('en-IN')}/sq.ft)
                    </p>
                  </div>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#777777]">BHK Configuration</span>
                    <p className="font-bold text-[#252525] mt-0.5">{formData.bhk}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#777777]">Carpet Area</span>
                    <p className="font-bold text-[#252525] mt-0.5">{formData.carpetArea} sq.ft</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#777777]">Floor</span>
                    <p className="font-bold text-[#252525] mt-0.5">
                      {formData.floorNumber} of {formData.totalFloors}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#777777]">Possession</span>
                    <p className="font-bold text-[#252525] mt-0.5">{formData.possessionStatus}</p>
                  </div>
                </div>

                {/* Image Previews */}
                <div>
                  <h4 className="text-xs font-bold text-[#252525] uppercase tracking-wider mb-2">
                    Photos ({formData.photos.length})
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {formData.photos.map((p, i) => (
                      <img
                        key={i}
                        src={p.url}
                        alt={p.caption}
                        className="w-24 h-16 object-cover rounded-lg border border-[#EAEAEA] shrink-0"
                      />
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="p-4 bg-white rounded-xl border border-[#EAEAEA] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FCEEEF] text-[#C6383B] flex items-center justify-center font-bold">
                      {formData.contactName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-[#777777] font-semibold">Posted By {formData.postedBy}</p>
                      <p className="text-sm font-bold text-[#252525]">{formData.contactName}</p>
                      <p className="text-xs text-[#777777]">
                        +91 {formData.contactPhone} • {formData.contactEmail}
                      </p>
                    </div>
                  </div>
                  {formData.reraNumber && (
                    <Badge variant="outline" size="sm" className="font-mono text-xs">
                      RERA: {formData.reraNumber}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <Checkbox
                  id="terms-checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  label="I confirm that all provided property specifications, RERA registrations, and ownership disclosures are genuine and accurate."
                  error={errors.terms}
                />
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-6 mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            {currentStep < 14 ? (
              <Button variant="primary" onClick={handleNext}>
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handlePublish} className="bg-[#21865B] hover:bg-[#1b6b49]">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Listing
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#21865B]/10 text-[#21865B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-semibold mb-2">
                Simulated Demo Submission
              </span>
              <h3 className="text-xl font-bold text-[#252525]">Property Submitted!</h3>
              <p className="text-xs text-[#777777] mt-1">
                Your listing reference number is{' '}
                <span className="font-mono font-bold text-[#252525]">{submissionId}</span>. It has been placed in the demo moderation queue.
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#777777]">Property:</span>
                <span className="font-semibold text-[#252525]">{formData.bhk} in {formData.locality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Price:</span>
                <span className="font-semibold text-[#C6383B]">{formatINR(formData.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Lister:</span>
                <span className="font-semibold text-[#252525]">{formData.contactName} ({formData.postedBy})</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                onClick={() => router.push('/dashboard/agent')}
                className="w-full"
              >
                Go to Agent Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(DEFAULT_FORM_DATA);
                }}
                className="w-full"
              >
                Post Another Property
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

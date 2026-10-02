import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, User, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../api.js';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: defaultDate,
    time_slot: 'Lunch (01:00 PM)',
    guests: 2,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (minimum 2 characters)';
    }

    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g., +91 98421 54321)';
    }

    if (!formData.date) {
      errs.date = 'Please select a dining date';
    }

    if (!formData.time_slot) {
      errs.time_slot = 'Please select a preferred service time';
    }

    if (formData.guests < 1 || formData.guests > 50) {
      errs.guests = 'Guests must be between 1 and 50';
    }

    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email address';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const res = await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email.trim() || undefined,
        date: formData.date,
        time_slot: formData.time_slot,
        guests: Number(formData.guests),
        message: formData.message.trim() || undefined,
      });

      setSuccessResponse(res);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setApiError(err.message || 'Failed to submit enquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessResponse(null);
    setApiError(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-lg border border-[#6B1D28]/20 w-full max-w-lg overflow-hidden shadow-2xl my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#4F131C] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#E09E2B]">
              Race Course • Coimbatore
            </div>
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white mt-0.5">
              Table Enquiry & Reservation
            </h3>
            <div className="font-tamil text-xs text-[#E09E2B] mt-0.5">
              மேஜை முன்பதிவு / தொடர்பு
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successResponse ? (
            /* Real Success Confirmation Screen */
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-[#4F131C]">
                Enquiry Received!
              </h4>

              <p className="text-sm text-[#554E48] font-light max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="font-semibold text-[#242220]">{formData.name}</strong>. Your dining enquiry
                for <strong className="font-semibold">{formData.guests} guests</strong> on{' '}
                <strong className="font-semibold">{formData.date}</strong> ({formData.time_slot}) has been registered in
                our kitchen schedule.
              </p>

              <div className="bg-[#F3EDE2] p-4 rounded text-left text-xs space-y-2 border border-[#6B1D28]/15 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Reference ID:</span>
                  <span className="font-bold text-[#4F131C]">#VM-{successResponse.enquiry?.id || '101'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Contact Phone:</span>
                  <span className="font-medium text-[#242220]">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A736C]">Status:</span>
                  <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                    Pending Confirmation
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7A736C] italic pt-2">
                Our mess host will call your number to reconfirm. Walk-ins are always welcomed during open service hours!
              </p>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded bg-[#4F131C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A736C] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-[#6B1D28]/20 focus:border-[#4F131C]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-rose-600 text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7A736C] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98421 54321"
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-[#6B1D28]/20 focus:border-[#4F131C]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-rose-600 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7A736C] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-[#6B1D28]/20 focus:border-[#4F131C]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-rose-600 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Date, Time Slot & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none focus:border-[#4F131C]"
                  />
                  {errors.date && <p className="text-rose-600 text-[11px] mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={formData.time_slot}
                    onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                    className="w-full px-2 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none focus:border-[#4F131C]"
                  >
                    <optgroup label="Lunch Service (12 PM - 4 PM)">
                      <option value="Lunch (12:30 PM)">Lunch - 12:30 PM</option>
                      <option value="Lunch (01:00 PM)">Lunch - 01:00 PM</option>
                      <option value="Lunch (01:45 PM)">Lunch - 01:45 PM</option>
                      <option value="Lunch (02:30 PM)">Lunch - 02:30 PM</option>
                    </optgroup>
                    <optgroup label="Dinner Service (7 PM - 11 PM)">
                      <option value="Dinner (07:30 PM)">Dinner - 07:30 PM</option>
                      <option value="Dinner (08:15 PM)">Dinner - 08:15 PM</option>
                      <option value="Dinner (09:00 PM)">Dinner - 09:00 PM</option>
                      <option value="Dinner (09:45 PM)">Dinner - 09:45 PM</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Guests *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none focus:border-[#4F131C]"
                  />
                  {errors.guests && <p className="text-rose-600 text-[11px] mt-1">{errors.guests}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  Special Requests / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Ground floor seating for elderly, pre-order kola urundai batch, birthday lunch..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none focus:border-[#4F131C]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded bg-[#4F131C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] shadow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#E09E2B]" />
                      <span>Saving to SQLite Database...</span>
                    </>
                  ) : (
                    <span>Submit Reservation Enquiry</span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#7A736C] text-center pt-1">
                Data saved directly to local SQLite database. We do not share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

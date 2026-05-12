// src/styles/common.js
// Theme: The Digital Curator (Stitch Design System)

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-surface min-h-screen text-on-surface font-newsreader transition-colors duration-300"
export const pageWrapper    = "max-w-6xl mx-auto px-6 py-16"
export const section        = "mb-20"

// ─── Cards ────────────────────────────────────────────
// The "No-Line" Rule: boundaries by background color shifts.
export const cardClass      = "bg-surface-container-low rounded-2xl p-8 transition-all duration-300 hover:bg-surface-container-lowest hover:shadow-[0_20px_40px_rgba(25,28,29,0.05)] cursor-pointer"

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "font-manrope text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight"
export const headingClass   = "font-manrope text-2xl md:text-3xl font-bold text-on-surface"
export const subHeadingClass= "font-manrope text-xl font-semibold text-on-surface-variant"
export const bodyText       = "font-newsreader text-lg text-on-surface leading-relaxed"
export const mutedText      = "font-inter text-sm text-on-surface-variant"
export const linkClass      = "font-inter text-secondary hover:text-secondary-container transition-colors"

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn     = "font-inter font-medium px-6 py-3 rounded-md bg-linear-to-br from-primary to-primary-container text-on-primary shadow-sm hover:shadow-[0_10px_20px_rgba(25,28,29,0.1)] transition-all duration-300 cursor-pointer text-sm"
export const secondaryBtn   = "font-inter font-medium px-6 py-3 rounded-md bg-secondary-container text-secondary transition-colors cursor-pointer text-sm hover:bg-secondary hover:text-white"
export const ghostBtn       = "font-inter text-on-surface font-medium hover:text-secondary transition-colors cursor-pointer text-sm"

// ─── Forms ────────────────────────────────────────────
export const formCard       = "bg-surface-container-low rounded-2xl p-10 max-w-lg mx-auto"
export const formTitle      = "font-manrope text-3xl font-extrabold text-on-surface text-center mb-8"
export const labelClass     = "font-inter text-sm font-semibold text-on-surface-variant mb-2 block"
// "Soft Fill" instead of boxes
export const inputClass     = "w-full font-inter bg-surface-container-high rounded-md px-4 py-3 text-on-surface text-sm transition-all focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20"
export const formGroup      = "mb-6"
export const submitBtn      = "w-full font-inter font-semibold py-3 rounded-md bg-linear-to-br from-primary to-primary-container text-on-primary hover:shadow-[0_10px_20px_rgba(25,28,29,0.1)] transition-all duration-300 cursor-pointer mt-4 text-sm tracking-wide"

// ─── Navbar ───────────────────────────────────────────
// Glassmorphism rule
export const navbarClass        = "sticky top-0 z-50 px-6 py-4 bg-surface-bright/80 backdrop-blur-md"
export const navContainerClass  = "max-w-6xl mx-auto w-full flex items-center justify-between"
export const navBrandClass      = "font-manrope text-2xl font-extrabold text-primary tracking-tighter"
export const navLinksClass      = "flex items-center gap-8"
export const navLinkClass       = "font-inter text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold"
export const navLinkActiveClass = "font-inter text-sm text-primary font-bold border-b-[2px] border-primary pb-1"

// ─── Article / Blog ───────────────────────────────────
export const articleGrid        = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
export const articleCardClass   = "bg-surface-container-low rounded-xl p-8 transition-all duration-400 flex flex-col gap-4 cursor-pointer h-full hover:bg-surface-container-lowest hover:shadow-[0_20px_40px_rgba(25,28,29,0.05)] hover:-translate-y-1"
export const articleTitle       = "font-manrope text-2xl font-bold text-on-surface leading-snug line-clamp-2"
export const articleExcerpt     = "font-newsreader text-base text-on-surface-variant line-clamp-3 mb-auto leading-relaxed"
export const articleMeta        = "font-inter text-sm text-on-surface-variant mt-2"
export const articleBody        = "font-newsreader text-lg lg:text-xl text-on-surface leading-relaxed max-w-3xl"
export const timestampClass     = "font-inter text-xs font-medium text-on-surface-variant/70 uppercase tracking-widest"
export const tagClass           = "font-inter text-[11px] font-bold text-secondary bg-surface-container-highest px-3 py-1 rounded-full uppercase tracking-wider w-fit"

// ─── Feedback ─────────────────────────────────────────
export const errorClass         = "bg-red-50 text-red-800 rounded-md px-5 py-4 text-sm font-inter border border-red-100/50"
export const successClass       = "bg-green-50 text-green-800 rounded-md px-5 py-4 text-sm font-inter border border-green-100/50"
export const loadingClass       = "font-inter font-medium text-on-surface-variant text-sm animate-pulse text-center py-24"
export const emptyStateClass    = "font-newsreader text-center text-on-surface-variant py-24 text-lg"

// ─── Divider ──────────────────────────────────────────
// Ghost border fallback / spacing
export const divider            = "border-t border-outline-variant/15 my-12"

import { useTranslation } from 'react-i18next';

type HeaderProps = {
  /** Used above the application wizard: logo + back control */
  onCloseApplication?: () => void;
};

/**
 * Compact chrome for the ambassador application flow only.
 * The main site nav lives on {@link LandingPage}.
 */
export default function Header({ onCloseApplication }: Readonly<HeaderProps>) {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 bg-transparent border-none p-0"
            onClick={() => onCloseApplication?.()}
          >
            <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">₿</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              {t('brand.prefix')} <span className="text-[#F7931A]">{t('brand.highlight')}</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => onCloseApplication?.()}
            className="btn-outline-orange text-sm py-2 px-5"
          >
            {t('header.backToSite')}
          </button>
        </div>
      </div>
    </header>
  );
}

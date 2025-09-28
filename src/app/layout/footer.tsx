import { SOCIAL_MEDIA } from '@/constants/social-media-data';

const Footer = () => {
  return (
    <div className='flex items-center justify-center py-10 md:py-20 text-neutral-950 border-t border-neutral-300'>
      <div className='max-w-300 px-4 mx-auto flex items-center justify-center flex-col text-center'>
        <div className='flex items-center gap-3 md:gap-4 mb-4 md:mb-5.5'>
          <img
            src='/icons/logo-booky.svg'
            alt='logo booky'
            className='size-8 md:size-10.5'
          />
          <span className='text-display-md font-bold'>Booky</span>
        </div>
        <p className='text-sm md:text-md font-semibold mb-4 md:mb-10'>
          Discover inspiring stories & timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </p>
        <p className='text-md font-bold mb-5'>Follow on Social Media</p>
        <div className='flex gap-3 items-center'>
          {SOCIAL_MEDIA.map((item) => (
            <div
              key={item.name}
              className='flex justify-center items-center w-10 h-10 rounded-full border border-neutral-300'
            >
              <img src={item.src} alt={item.name} className={item.size} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

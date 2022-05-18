import { PhoneIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import LiftedWPBanner from '../../public/images/lifted.site-banner.png';
import LiftedFounderAvatar from '../../public/images/liftedwp-founder-avatar.png';

const profile = {
  name: 'Junior Teudjio',
  role: 'CEO & Tech-Lead',
  companyURL: 'https://lifted.site',
  companyName: 'lifted.site',
  email: 'junior@lifted.site',
  message:
    "Hey there, If you ever need my services on a similar project, I'd love to help!",
  callToActionURL: 'https://lifted.site/contact',
  callToActionMessage: 'Book a Call With Me',
  profileImage: LiftedFounderAvatar,
  coverImage: LiftedWPBanner,
};

export default function Header() {
  return (
    <div>
      <div className='mb-8'>
        <div className='relative h-60 w-full lg:h-64'>
          <Image
            className='object-cover scale-105'
            src={profile.coverImage}
            layout='fill'
            alt={`services offered by ${profile.companyName} - Headless Commerce & CMS Experts`}
          />
        </div>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
            <div className='flex'>
              <div className='relative h-28 w-28 rounded-full ring-4 ring-slate-200 sm:h-28 sm:w-28'>
                <Image
                  src={profile.profileImage}
                  layout='fill'
                  alt={`profile picture ${profile.name}`}
                />
              </div>
            </div>
            <div className='mt-4 sm:mt-12 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
              <div className='sm:hidden md:block mt-6 min-w-0 flex-1'>
                <h1 className='text-2xl font-bold text-gray-900 truncate'>
                  {profile.name}
                </h1>
                <p className='text-sm font-medium text-gray-500'>
                  {profile.role} at{' '}
                  <a
                    href={profile.companyURL}
                    className='text-gray-900 hover:text-liftedgreen-700'
                  >
                    {profile.companyName}
                  </a>{' '}
                </p>
                <p className='text-sm  font-light text-liftedgreen-600'>
                  {profile.message}
                </p>
              </div>
              <div className='mt-4 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                <a
                  href={profile.callToActionURL}
                  className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-liftedgreen-800 hover:bg-liftedgreen-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-liftedgreen-500'
                >
                  <PhoneIcon
                    className='-ml-1 mr-2 h-5 w-5'
                    aria-hidden='true'
                  />
                  {profile.callToActionMessage}
                </a>
              </div>
            </div>
          </div>

          <div className='hidden sm:block md:hidden mt-6 min-w-0 flex-1'>
            <h1 className='text-2xl font-bold text-gray-900 truncate'>
              {profile.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

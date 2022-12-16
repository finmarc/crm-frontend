import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import logoUrl from "@/assets/images/arrow-negative.png";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";

function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const { signOut, user} = useAuth();

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div
        className={`${props.className} top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700`}
      >
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/"
            className="logo -intro-x hidden md:flex xl:w-[180px] block"
          >
            <img
              alt="ícone finmarc"
              className="logo__image w-10 "
              src={logoUrl}
            />
            <span className="logo__text text-white text-lg ml-3"> Finmarc v1.0 </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Notifications */}
          <Dropdown className="intro-x mr-4 sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="notification notification--bullet cursor-pointer"
            >
              <Lucide
                icon="Bell"
                className="notification__icon dark:text-slate-500"
              />
            </DropdownToggle>
            <DropdownMenu className="notification-content pt-2">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title">Notifications</div>
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": fakerKey,
                    })}
                  >
                    <div className="w-12 h-12 flex-none image-fit mr-1">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="font-medium truncate mr-5">
                          {user?.name}
                        </a>
                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                          {user?.email}
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={$f()[9].photos[0]}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {user?.email}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={ signOut } >
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Sair
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: "",
};

export default Main;

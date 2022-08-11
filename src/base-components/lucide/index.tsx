import { createElement } from "react";
import * as lucideIcons from "lucide-react";
import PropTypes from "prop-types";
type PropsData = {
  icon?: string;
  className: string;
};
function Lucide(props: PropsData) {
  try {
   
    const { icon, className, ...computedProps } = props;
    if (props.icon) {
      return createElement(lucideIcons[props.icon], {
        ...computedProps,
        className: `lucide ${props.className}`,
      });
    } else {
      throw props.icon;
    }
  } catch (err) {
    throw `Lucide icon '${props.icon}' not found.`;
  }
}

// Lucide.propTypes = {
//   icon: PropTypes.string,
//   className: PropTypes.string,
// };

// Lucide.defaultProps = {
//   icon: "",
//   className: "",
// };

export default Lucide;

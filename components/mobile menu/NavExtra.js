import { motion } from "framer-motion";
import { menuItem } from "./Variants";

export default function NavExtra({ children, onClick, order }) {
  return (
    <motion.div
      variants={menuItem}
      initial="hidden"
      exit="hidden"
      animate="visible"
      custom={order}
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      className="w-full py-2 !mt-auto"
      tabIndex="0"
    >
      {children}
    </motion.div>
  );
}

import { useState } from "react";

const useSingleOpenByids = (initialIds, initialCurrentlyOpen) => {
  const [ids, setIds] = useState(initialIds);
  const [currentlyOpen, setCurrentlyOpen] = useState(initialCurrentlyOpen);

  const handleClick = (_id) => {
    // If open then close
    if (currentlyOpen === _id) {
      setCurrentlyOpen(null);
      // if not open then open
    } else {
      setCurrentlyOpen(_id);
    }
  };
  return [ids, setIds, currentlyOpen, handleClick];
};

export default useSingleOpenByids;

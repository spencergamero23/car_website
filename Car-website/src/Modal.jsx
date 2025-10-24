import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Modal({onClose}){
    return(
        <motion.div
        className="overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{type: "spring", stiffness: 300, damping: 25}}
            >
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
                <button className='close-button' onClick={onClose}>Close</button>
            </motion.div>
        </motion.div>
    );
}
function ModalWrapper(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div classname="modal-wrapper">
            <button className='open-button' onClick={() => setIsOpen(true)}>
                Open Modal
            </button>
            <AnimatePresence>
                {isOpen && <Modal onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
export default ModalWrapper;
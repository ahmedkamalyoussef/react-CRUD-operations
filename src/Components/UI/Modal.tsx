import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
interface IProps {
    children: ReactNode,
    isOpen: boolean,
    closeModal: () => void,
    title?: string
}
function Modal({ children, isOpen, title }: IProps) {
    const [closed, closeModal] = useState(false)
    function close() {
        closeModal(false)
    }
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-gray-700">
                                {title}
                            </DialogTitle>
                            <div className="mt-4">
                                {children}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal
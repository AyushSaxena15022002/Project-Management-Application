import { useRef } from 'react'
import { Input } from './Input'
import { Modal } from './Modal'

export const NewProject = ({ onAdd, onCancel }) => {
  const modal = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const dueDateRef = useRef()

  const handleSave = () => {
    const enteredTitle = titleRef.current.value
    const enteredDesc = descRef.current.value
    const enteredDueDate = dueDateRef.current.value

    if (
      enteredTitle.trim() === '' ||
      enteredDesc.trim() == '' ||
      enteredDueDate.trim() === ''
    ) {
      modal.current.open()
      return
    }

    onAdd({
      title: enteredTitle,
      desc: enteredDesc,
      dueDate: enteredDueDate,
    })
  }

  return (
    <>
      <Modal ref={modal} buttonCaption='Okay'>
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>
          Looks like you forgot to ENTER a VALUE
        </p>
        <p className='text-stone-600 mb-4'>
          Please be making sure that all the INPUT FIELDS recieve some valid
          input . THANKS
        </p>
      </Modal>
      <div className='w-[35rem] mt-16 '>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            {/* <button className='text-stone-800 hover:text-stone-950'> */}
            <button
              className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-red-600 hover:text-zinc-50'
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            {/* <button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'> */}
            <button
              className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-lime-600'
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type='text' ref={titleRef} label='Title' />
          <Input ref={descRef} label='Description' textarea={true} />
          <Input type='date' ref={dueDateRef} label='Due Date' />
        </div>
      </div>
    </>
  )
}

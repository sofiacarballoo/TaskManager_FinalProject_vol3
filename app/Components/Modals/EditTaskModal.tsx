import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

interface EditTaskModalProps {
  task: {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
  };
  closeModal: () => void;
}

const EditTaskModal = ({ task, closeModal }: EditTaskModalProps) => {
  const { updateTask } = useGlobalState();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleUpdateTask = () => {
    updateTask({ id: task.id, title, description, date, isCompleted });
    closeModal();
  };

  return (
    <ModalStyled>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="modal-content">
        <h1>Edit Task</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateTask(); }}>
          <div className="input-control">
            <label>
              Title <span></span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          <div className="input-control">
            <label>
              Description <span></span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="input-control">
            <label>
              Date <span></span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="input-control toggler">
            <label>Completed</label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
          </div>
          <div className="submit-btn">
            <Button
              name="Save Changes"
              background="#4caf50"
              color="white"
              type="submit"
              padding={"0.8rem 2rem"}
              borderRad={"0.8rem"}
              fw={"500"}
              fs={"1.2rem"}
            />
            <Button
              name="Cancel"
              background="#eb6841"
              color="white"
              click={closeModal}
              type="button"
              padding={"0.8rem 2rem"}
              borderRad={"0.8rem"}
              fw={"500"}
              fs={"1.2rem"}
            />
          </div>
        </form>
      </div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .modal-content {
    margin: 0 1rem;
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 101; /* Ensure modal content is above overlay */
    
    border-radius: 1rem;
    background-color: #29503d; /* Solid background color */
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};

    @media screen and (max-width: 450px) {
      font-size: 90%;
    }

    h1 {
      font-size: clamp(1.2rem, 5vw, 1.6rem);
      font-weight: 600;
      color: ${(props) => props.theme.colorGrey1};
    }

    .input-control {
      position: relative;
      margin: 1.6rem 0;
      font-weight: 500;

      @media screen and (max-width: 450px) {
        margin: 1rem 0;
      }

      label {
        margin-bottom: 0.5rem;
        display: inline-block;
        font-size: clamp(0.9rem, 5vw, 1.2rem);
        color: ${(props) => props.theme.colorGrey1};

        span {
          color: ${(props) => props.theme.colorGrey3};
        }
      }

      input,
      textarea {
        width: 100%;
        padding: 1rem;
        resize: none;
        background-color: #122a1e;
        color: ${(props) => props.theme.colorGrey};
        border-radius: 0.5rem;
      }
    }

    .submit-btn {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .toggler {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      label {
        flex: 1;
      }

      input {
        width: initial;
      }
    }
  }
`;

export default EditTaskModal;

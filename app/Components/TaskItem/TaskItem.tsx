import React, { useState } from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import { parseISO, differenceInDays } from "date-fns";
import EditTaskModal from "@/app/Components/Modals/EditTaskModal"; // Import the new modal

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const parsedDate = parseISO(date);
  const today = new Date();
  const daysRemaining = differenceInDays(parsedDate, today);

  const getDateClassName = () => {
    if (isCompleted) return "date";
    if (daysRemaining === 0) return "date today";
    if (daysRemaining > 0 && daysRemaining <= 3) return "date soon";
    if (daysRemaining < 0) return "date past-due";
    return "date";
  };

  const getDateText = () => {
    if (isCompleted) return formatDate(date);
    if (daysRemaining === 0) return formatDate(date) + " !!!";
    if (daysRemaining > 0 && daysRemaining <= 3) return formatDate(date) + " !";
    if (daysRemaining < 0) return formatDate(date) + " - Past Due";
    return formatDate(date);
  };

  return (
    <>
      <TaskItemStyled theme={theme}>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className={getDateClassName()}>{getDateText()}</p>
        <div className="task-footer">
          {isCompleted ? (
            <button
              className="completed"
              onClick={() => {
                const task = {
                  id,
                  isCompleted: !isCompleted,
                };

                updateTask(task);
              }}
            >
              Completed
            </button>
          ) : (
            <button
              className="incomplete"
              onClick={() => {
                const task = {
                  id,
                  isCompleted: !isCompleted,
                };

                updateTask(task);
              }}
            >
              Incomplete
            </button>
          )}
          <button
            className="edit"
            onClick={() => setIsEditModalOpen(true)}
          >
            {edit}
          </button>
          <button
            className="delete"
            onClick={() => deleteTask(id)}
          >
            {trash}
          </button>
        </div>
      </TaskItemStyled>

      {isEditModalOpen && (
        <EditTaskModal
          task={{ id, title, description, date, isCompleted }}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
    &.today {
      color: ${(props) => props.theme.colorRed};
    }
    &.soon {
      color: ${(props) => props.theme.colorYellow};
    }
    &.past-due {
      color: ${(props) => props.theme.colorDanger}; /* Add a color for past due dates if needed */
      font-weight: bold;
    }
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;

import React from 'react';
import type { Project } from '@types';

type Props = {
  index?: number;
  project?: Project;
};

type Tags = Pick<Project, 'tags'>;

const ProjectCard: React.FC<Props | any> = ({ index, project }) => {
  const { tags }: Tags = project;
  return (
    <div className={`md:basis-1/2 md:px-8 md:py-4  py-4`}>
      <div className={`project-card project-card-${index}`}>
        <div className="border-gray-300 overflow-hidden rounded-md shadow-md">
          <img src={project.image} alt="project-image" width="100%" />
        </div>
        <div className="overflow-hidden">
          <div className="project-text flex items-center justify-between">
            <h3 className=" text-marrsgreen dark:text-carrigreen my-1 text-lg font-medium">
              {project.title}
            </h3>
            <div className="my-2 mr-[0.1rem] flex items-center space-x-5 sm:my-0 sm:space-x-3">
              <a
                href={project.retrospective}
                title={`Read retrospective for '${project.title}' on Medium`}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen mr-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
                </svg>
              </a>
              <a
                href={project.codeUrl}
                title={`See '${project.title}' on Github`}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen mr-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-black dark:fill-bglight scale-150 opacity-75 hover:-rotate-12 sm:scale-125"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  ></path>
                </svg>
              </a>
              <a
                href={project.liveUrl}
                title={`See live demo of '${project.title}'`}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen mr-8 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-cardlight dark:bg-carddark hover:bg-gray-300 dark:hover:bg-gray-600 h-7 w-7 scale-125 rounded-full p-1 hover:-rotate-12 sm:scale-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <p className="project-desc">{project.desc}</p>
        </div>
        <ul
          aria-label={`Tech Stack used in ${project.title}`}
          className={`md:mt-2 md:mb-6 mt-2 mb-4 flex flex-wrap overflow-hidden text-sm`}
        >
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className={`project-tags dark:bg-carddark my-1 mr-2 rounded bg-[#E2EFEF] py-1 px-2`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;

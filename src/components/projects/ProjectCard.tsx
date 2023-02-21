import socialIcons from '@assets/socialIcons';
import type { Project } from '@types';

type Props = {
  index: number;
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ index, project }) => {
  return (
    <div
      className="flex flex-row gap-10 p-5 no-underline hover:scale-110 hover:duration-300 hover:ease-out"
      style={{ border: '1px solid red' }}
    >
      <div
        className="w-30 flex cursor-pointer flex-col justify-center"
        style={{ border: '1px solid white' }}
      >
        <a href={project.liveUrl} target="_blank">
          <img src={project.image} width="300px" />
          <span>{project.desc}</span>
        </a>
      </div>
      <div>
        <img src={socialIcons.Github} />
      </div>
    </div>
  );
};

export default ProjectCard;

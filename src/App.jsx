import { useEffect, useState } from 'react'
import { NewProject } from './components/NewProject.jsx'
import { NoProjectSelected } from './components/NoProjectSelected.jsx'
import { ProjectsSidebar } from './components/ProjectsSidebar.jsx'
import { SelectedProject } from './components/SelectedProject.jsx'

const getLocalStorage = () => {
  let DATA = localStorage.getItem('data')
  if (DATA) {
    let result = JSON.parse(localStorage.getItem('data'))
    result = {
      ...result,
      selectedProjectID: undefined,
    }

    return result
  } else {
    return {
      selectedProjectID: undefined,
      projects: [],
      tasks: [],
    }
  }
}

const App = () => {
  // selectedProjectID : undefined  ==> means no project selected or being created
  // selectedProjectID : null  ==> means a new project in creation
  // selectedProjectID : x ==> represent a project with id 'x' being selected and displayed
  const [projectsState, setProjectsState] = useState(getLocalStorage)

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(projectsState))
  }, [projectsState])

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      let d = new Date().getTime()
      const newTask = {
        text: text,
        projectID: prevState.selectedProjectID,
        taskID: d,
      }

      // console.log(newTask)

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }
    })
  }

  const handleDeleteTask = (id) => {
    // console.log(id)
    setProjectsState((prevState) => {
      let newTasks = prevState.tasks.filter((task) => task.taskID !== id)

      return {
        ...prevState,
        tasks: [...newTasks],
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      }
    })
  }

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null,
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectsState((prevState) => {
      let d = new Date().getTime()
      const newProj = {
        ...projectData,
        id: d,
      }

      return {
        ...prevState,
        selectedProjectID: newProj.id,
        projects: [...prevState.projects, newProj],
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      let newTasks = prevState.tasks.filter(
        (task) => task.projectID !== prevState.selectedProjectID
      )
      return {
        ...prevState,
        selectedProjectID: undefined,
        tasks: [...newTasks],
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectID
        ),
      }
    })
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectID
  )

  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  )
  if (projectsState.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    )
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectID={projectsState.selectedProjectID}
      />
      {content}
    </main>
  )
}

export default App

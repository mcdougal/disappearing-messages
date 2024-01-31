import getButtonsSection from './getButtonsSection';
import getTextareaSection from './getTextareaSection';

const AdminComponents = (): React.ReactElement => {
  const sections = [getButtonsSection(), getTextareaSection()];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-14 text-5xl">Components</h1>
      {sections.map((section) => {
        return (
          <div key={section.title} className="mb-14">
            <h2 className="mb-10 text-3xl font-extrabold">{section.title}</h2>
            <div className="flex flex-col gap-y-10">
              {section.subsections.map((subsection) => {
                return (
                  <div key={subsection.title}>
                    <h3 className="text-1xl">{subsection.title}</h3>
                    <div className="flex items-center justify-center gap-20 rounded-lg border border-slate-900/10 px-4 py-8">
                      {subsection.demos}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminComponents;

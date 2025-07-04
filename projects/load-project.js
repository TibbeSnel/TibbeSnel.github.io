// projects/load-project.js
export function loadProject(projectName) {
  // Fetch the project JSON file based on the projectName (filename)
  fetch(`./projects/${projectName}.json`)
    .then(res => res.json())
    .then(projectArr => {
      // The file is expected to be an array with one project object
      const data = projectArr[0];
      const contentDiv = document.getElementById('content');

      if (!data) {
        contentDiv.innerHTML = `<p class="text-red-500">Project not found.</p>`;
        return;
      }

      // Title (with correct class)
      const title = document.createElement('h1');
      title.textContent = data.title;
      title.className = 'project-title';
      contentDiv.appendChild(title);

      // Date (if present)
      if (data.date) {
        const dateEl = document.createElement('div');
        dateEl.className = 'project-date';
        // Format date as e.g. June 7, 2025
        const dateObj = new Date(data.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = dateObj.toLocaleDateString(undefined, options);
        contentDiv.appendChild(dateEl);
      }

      // Title Image
      if (data.titleImage) {
        const titleImg = document.createElement('img');
        titleImg.src = data.titleImage.src;
        titleImg.alt = data.titleImage.alt || '';
        titleImg.className = 'my-4 w-full max-h-96 object-cover rounded project-title-image';
        contentDiv.appendChild(titleImg);
      }

      // Introduction with support for newlines
      const intro = document.createElement('p');
      intro.innerHTML = data.introduction.replace(/\n/g, '<br>');
      intro.className = 'project-introduction';
      contentDiv.appendChild(intro);

      // Table of Contents (Dropdown)
      const tocDropdown = document.createElement('div');
      tocDropdown.className = 'toc-dropdown';
      const tocBtn = document.createElement('button');
      tocBtn.className = 'toc-dropdown-btn';
      tocBtn.type = 'button';
      tocBtn.innerHTML = 'Table of Contents <span class="toc-caret">&#x25BC;</span>';
      tocDropdown.appendChild(tocBtn);
      const tocList = document.createElement('ul');
      tocList.className = 'toc-dropdown-list';
      tocList.id = 'toc';
      tocDropdown.appendChild(tocList);
      contentDiv.appendChild(tocDropdown);

      // Dropdown toggle logic
      tocBtn.addEventListener('click', () => {
        tocDropdown.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!tocDropdown.contains(e.target)) {
          tocDropdown.classList.remove('open');
        }
      });


      // Sections
      data.sections.forEach((section, index) => {
        const sectionId = `section-${index}`;

        // TOC Entry
        if (section.heading) {
          const tocItem = document.createElement('li');
          const tocLink = document.createElement('a');
          tocLink.href = `#${sectionId}`;
          tocLink.textContent = section.heading;
          tocItem.appendChild(tocLink);
          tocList.appendChild(tocItem);
        }

        // Section Block
        const sectionEl = document.createElement('section');
        sectionEl.id = sectionId;
        sectionEl.classList.add('project-section');

        if (section.heading) {
          const heading = document.createElement('h2');
          heading.textContent = section.heading;
          heading.className = 'project-section-heading';
          sectionEl.appendChild(heading);
        }

        if (section.image) {
          const figure = document.createElement('figure');

          const img = document.createElement('img');
          img.src = section.image.src;
          img.alt = section.image.alt || '';
          img.className = 'project-section-image';
          figure.appendChild(img);

          if (section.image.alt) {
            const caption = document.createElement('figcaption');
            caption.textContent = section.image.alt;
            caption.className = 'project-image-description';
            figure.appendChild(caption);
          }

          sectionEl.appendChild(figure);
        }

        // Video support
        if (section.video) {
          const video = document.createElement('video');
          video.src = section.video.src;
          video.controls = true;
          video.className = 'project-section-video';
          video.alt = section.video.alt || '';
          sectionEl.appendChild(video);
        }

        if (section.text) {
          const para = document.createElement('p');
          para.innerHTML = section.text.replace(/\n/g, '<br>');
          para.className = 'project-section-text';
          sectionEl.appendChild(para);
        }

        if (section.link) {
          const link = document.createElement('a');
          link.href = section.link.url;
          link.textContent = section.link.label;
          link.target = '_blank';
          link.className = 'project-section-link';
          sectionEl.appendChild(link);
        }

        // Dot-list support
        if (section["dot-list"]) {
          const ul = document.createElement('ul');
          ul.className = 'dot-list';
          section["dot-list"].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          sectionEl.appendChild(ul);
        }
        // Numbered-list support
        if (section["numbered-list"]) {
          const ol = document.createElement('ol');
          ol.className = 'numbered-list';
          section["numbered-list"].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ol.appendChild(li);
          });
          sectionEl.appendChild(ol);
        }

        // Code block support
        if (section.code && section.code.content) {
          const codeBlockWrapper = document.createElement('div');
          codeBlockWrapper.className = 'project-code-block-wrapper';

          if (section.code.language) {
            const langBar = document.createElement('div');
            langBar.className = 'project-code-langbar';
            langBar.textContent = section.code.language;
            codeBlockWrapper.appendChild(langBar);
          }

          const pre = document.createElement('pre');
          pre.className = 'project-code-block';
          const code = document.createElement('code');
          code.textContent = section.code.content;
          if (section.code.language) {
            code.className = `language-${section.code.language}`;
          }
          pre.appendChild(code);
          codeBlockWrapper.appendChild(pre);
          sectionEl.appendChild(codeBlockWrapper);
        }

        contentDiv.appendChild(sectionEl);
      });
    })
    .catch(err => {
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = `<p class="text-red-500">Error loading project.</p>`;
      console.error(err);
    });
}

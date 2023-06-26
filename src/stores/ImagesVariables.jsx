import { create } from "zustand";

const useImagesVariables = create((set) => ({
  data: [],
  isMobile: true,
  loading: true,
  fetch: async () => {
    set({ loading: true });
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=spider&limit=100&apikey=${process.env.NEXT_PUBLIC_MARVEL_API_KEY}`
    );
    const result = await response.json();
    const data = result.data.results
      .filter((item) => item.description)
      .map((item, i) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          imgUrl: `${item.thumbnail.path}.${item.thumbnail.extension}`,
          comics: item.comics.items.map((comic) => comic.name),
          series: item.series.items.map((serie) => serie.name),
          stories: item.stories.items.map((storie) => storie.name),
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          //   x: ((Math.random(2) * window.innerWidth) % 2) - 1,
          //   y: ((Math.random() * window.innerHeight) % 2) - 1,
          z: i,
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
        };
      });
    set({
      data,
      isMobile: window.innerWidth < 850,
      loading: false,
    });
  },
  resetZ: ({ index, excess }) => {
    set((state) => {
      const newData = state.data.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            z: i - excess,
          };
        }
        return item;
      });

      return { data: newData };
    });
  },
  minusZAxis: () => {
    set((state) => {
      const data = state.data.map((item, i) => {
        return {
          ...item,
          //   x: item.x - item.x * 0.1 - item.x,
          //   y: item.y - item.y * 0.1 - item.y,
          x: item.x,
          y: item.y,
          z: item.z - 0.2 < -4 ? 4 : item.z - 0.2,
        };
      });

      return { data };
    });
  },
  plusZAxis: () => {
    set((state) => {
      const data = state.data.map((item, i) => {
        return {
          ...item,
          x:
            item.z + 0.2 > 4
              ? ((Math.random(2) * window.innerWidth) % 2) - 1
              : item.x,
          y:
            item.z + 0.2 > 4
              ? ((Math.random() * window.innerHeight) % 2) - 1
              : item.y,
          z: item.z + 0.2 > 4 ? -2 - Math.random(2) : item.z + 0.2,
        };
      });

      return { data };
    });
  },
  lookMousePosition: ({ mouseX, mouseY }) => {
    set((state) => {
      if (state.isMobile) return state;
      const data = state.data.map((item, i) => {
        return {
          ...item,
          rotation: {
            // x: item.rotation.x + (mouseY - item.rotation.x) * 0.01,
            // y: item.rotation.y + (-mouseX - item.rotation.y) * 0.01,
            // x: (-mouseY / item.x) * Math.PI * 0.01,
            // y: (-mouseX - item.y) * Math.PI * 0.01,
            // x: (mouseY / window.innerHeight) * Math.PI * 0.25,
            // y: (mouseX / window.innerWidth) * Math.PI * 0.25,
            y: (mouseX / window.innerWidth) * Math.PI * 0.15 - 0.1,
            x:
              ((mouseY - item.y) / window.innerHeight + item.y) *
              Math.PI *
              0.25,
            // y:
            //   ((mouseX + item.x) / window.innerWidth - item.x) * Math.PI * 0.25,
            z: (mouseX / window.innerWidth) * Math.PI * 0.15 - 0.1,
          },
        };
      });

      return { data };
    });
  },
}));

export default useImagesVariables;

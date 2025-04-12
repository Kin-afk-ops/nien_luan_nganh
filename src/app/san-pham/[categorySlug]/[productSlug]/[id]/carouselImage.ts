// utils/carouselUtils.ts
export const isImagePartiallyHidden = (
    container: HTMLDivElement | null,
    item: HTMLDivElement | null
  ): boolean => {
    if (!container || !item) return false;
  
    const containerRect = container.getBoundingClientRect();
    const imageRect = item.getBoundingClientRect();
  
    return (
      imageRect.left < containerRect.left + 20 || // Bị khuất bên trái
      imageRect.right > containerRect.right - 20 // Bị khuất bên phải
    );
  };
  
  export const scrollToActive = (item: HTMLDivElement | null) => {
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  
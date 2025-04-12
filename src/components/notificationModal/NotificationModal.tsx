interface ChildProps {
  title: string;
  content: string;
}

const NotificationModal: React.FC<ChildProps> = ({ title, content }) => {
  return (
    <div className="main-container">
      <p className="notification__title">{title}</p>
      <p className="notification__content">{content}</p>
      <button className="secondary-btn">OK</button>
    </div>
  );
};

export default NotificationModal;

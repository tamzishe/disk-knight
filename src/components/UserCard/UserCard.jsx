import styles from "./UserCard.module.css";

function UserCard({ name, avatar, onClick }) {
	return (
		<div className={styles.card} onClick={onClick}>
            <img src={avatar} alt={name} className={styles.avatar} />
            <h2 className={styles.name}>{name}</h2>
        </div>
	);
}
export default UserCard;
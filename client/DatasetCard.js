const DatasetCard = ({
  title,
  description,
  username,
  category,
  viewCount,
  downloadCount,
  commentCount,
  releasedAt,
  format,
}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>
            <div>{title}</div>
            <div>{description}</div>
            <a>Смотреть данные</a>
            <div>{username}</div>
            <div>{category}</div>
          </td>
          <td>
            <div>{viewCount}</div>
            <div>{downloadCount}</div>
            <div>{commentCount}</div>
            <div>{releasedAt}</div>
            <a>Таблица</a>
            <a>API</a>
            <a>Скачать</a>
            <div>{format}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default DatasetCard

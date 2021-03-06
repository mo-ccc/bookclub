const SortSelector = ({onChangeFunc}) => {
    return(
        <select onChange={onChangeFunc}>
          <option value={0}>Recent(DSC)</option>
          <option value={1}>Recent(ASC)</option>
          <option value={2}>Date(DSC)</option>
          <option value={3}>Date(ASC)</option>
        </select>
    )
}
export default SortSelector
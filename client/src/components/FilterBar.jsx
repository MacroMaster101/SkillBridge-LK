export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedJobType,
  onJobTypeChange,
  selectedWorkMode,
  onWorkModeChange,
  selectedLocation,
  onLocationChange,
  categories,
  jobTypes,
  workModes
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ marginBottom: '16px' }}
      />

      <div className="filters-bar">
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={selectedJobType} onChange={(e) => onJobTypeChange(e.target.value)}>
          <option value="">All Job Types</option>
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select value={selectedWorkMode} onChange={(e) => onWorkModeChange(e.target.value)}>
          <option value="">All Work Modes</option>
          {workModes.map(mode => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Location"
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
    </div>
  );
}

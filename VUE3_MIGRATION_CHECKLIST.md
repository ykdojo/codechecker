# Vue 2 to Vue 3 Migration Checklist

## Instructions for Agents
**IMPORTANT**: When working on this migration, you MUST update this checklist as you complete tasks. Change `- [ ]` to `- [x]` for each completed item. This ensures proper progress tracking and prevents duplicate work.

## Core Files (Priority 1)
- [x] `web/server/vue-cli/package.json` - Update all Vue ecosystem dependencies
- [x] `web/server/vue-cli/src/main.js` - Replace `new Vue()` with `createApp()`
- [x] `web/server/vue-cli/src/router/index.js` - Update to Vue Router 4 syntax
- [x] `web/server/vue-cli/src/store/index.js` - Update to Vuex 4 or migrate to Pinia
- [x] `web/server/vue-cli/src/plugins/vuetify.js` - Update to Vuetify 3 syntax

## Build Configuration
- [x] `web/server/vue-cli/config/webpack.common.js` - Update loaders for Vue 3
- [x] `web/server/vue-cli/config/webpack.dev.js` - Update dev server config
- [x] `web/server/vue-cli/config/webpack.prod.js` - Update production config
- [x] `web/server/vue-cli/config/helpers.js` - Build helper functions
- [x] `web/server/vue-cli/.eslintrc.js` - Update ESLint rules for Vue 3
- [x] `web/server/vue-cli/.babelrc` - Update Babel config if needed
- [x] `web/server/vue-cli/jest` config in package.json - Update test transform
- [x] `web/server/vue-cli/nightwatch.conf.js` - E2E test configuration

## Event Bus Files (Priority 2)
### Files creating event buses with `new Vue()`
- [ ] `web/server/vue-cli/src/services/api/_base.service.js` - Replace event bus
- [ ] `web/server/vue-cli/src/views/Statistics.vue` - Replace event bus
- [ ] `web/server/vue-cli/src/components/Report/Report.vue` - Replace event bus  
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseSelectOptionFilter.mixin.js` - Replace event bus
- [ ] `web/server/vue-cli/src/components/Report/Comment/ReportComments.vue` - Replace event bus
- [ ] `web/server/vue-cli/src/components/ReviewStatus/ListReviewStatusRules.vue` - Replace event bus
- [ ] `web/server/vue-cli/src/components/Product/EditProductBtn.vue` - Replace event bus
- [ ] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermissionBtn.vue` - Replace event bus

### Files using `Vue.extend()`
- [ ] `web/server/vue-cli/src/components/Report/Report.vue` - Replace `Vue.extend()` with `defineComponent()`
- [ ] `web/server/vue-cli/src/components/Report/Git/GitBlame.js` - Replace `Vue.extend()` with `defineComponent()`

## All Vue Components (134 files)
### Views
- [ ] `web/server/vue-cli/src/App.vue`
- [ ] `web/server/vue-cli/src/views/Reports.vue`
- [ ] `web/server/vue-cli/src/views/SourceComponent.vue`
- [ ] `web/server/vue-cli/src/views/Login.vue`
- [ ] `web/server/vue-cli/src/views/ReviewStatusRules.vue`
- [ ] `web/server/vue-cli/src/views/ReportDetail.vue`
- [ ] `web/server/vue-cli/src/views/RunList.vue`
- [ ] `web/server/vue-cli/src/views/Statistics.vue`
- [ ] `web/server/vue-cli/src/views/NewFeatures.vue`
- [ ] `web/server/vue-cli/src/views/CleanupPlan.vue`
- [ ] `web/server/vue-cli/src/views/ProductDetail.vue`
- [ ] `web/server/vue-cli/src/views/RunDetail.vue`
- [ ] `web/server/vue-cli/src/views/Userguide.vue`
- [ ] `web/server/vue-cli/src/views/NotFound.vue`
- [ ] `web/server/vue-cli/src/views/OAuthLogin.vue`
- [ ] `web/server/vue-cli/src/views/Products.vue`

### Core Components
- [ ] `web/server/vue-cli/src/components/TooltipHelpIcon.vue`
- [ ] `web/server/vue-cli/src/components/ConfirmDialog.vue`
- [ ] `web/server/vue-cli/src/components/CountChips.vue`
- [ ] `web/server/vue-cli/src/components/DateTimePicker.vue`
- [ ] `web/server/vue-cli/src/components/AnalysisInfoDialog.vue`
- [ ] `web/server/vue-cli/src/components/Alerts.vue`
- [ ] `web/server/vue-cli/src/components/BulbMessage.vue`
- [ ] `web/server/vue-cli/src/components/CopyBtn.vue`
- [ ] `web/server/vue-cli/src/components/CheckerDocumentationDialog.vue`
- [ ] `web/server/vue-cli/src/components/Errors.vue`

### Statistics Components
- [ ] `web/server/vue-cli/src/components/Statistics/ReportDiffCount.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/StatisticsDialog.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/UniqueStatWarning.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/BaseStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/BaseStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Severity/SeverityStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Severity/SeverityStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Checker/CheckerStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Checker/CheckerStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Component/ComponentStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Component/ComponentStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Component/ExpandedItem.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Guideline/GuidelineStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Guideline/GuidelineStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/CheckerCoverage/CheckerCoverageStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/CheckerCoverage/CheckerCoverageStatisticsTable.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/Reports.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/FailedFilesDialog.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/SingleLineWidget.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/OutstandingReportsChart.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/Overview.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatistics.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatisticsChart.vue`
- [ ] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatisticsTable.vue`

### Review Status Components
- [ ] `web/server/vue-cli/src/components/ReviewStatus/ReviewStatusLabel.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/ListReviewStatusRules.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/RemoveFilteredRulesDialog.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/EditReviewStatusRuleDialog.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/ReviewStatusRuleFilter.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/SelectReviewStatus.vue`
- [ ] `web/server/vue-cli/src/components/ReviewStatus/RemoveReviewStatusRuleDialog.vue`

### Product Components
- [ ] `web/server/vue-cli/src/components/Product/ProductConfigForm.vue`
- [ ] `web/server/vue-cli/src/components/Product/DeleteProductBtn.vue`
- [ ] `web/server/vue-cli/src/components/Product/EditAnnouncementBtn.vue`
- [ ] `web/server/vue-cli/src/components/Product/NewProductBtn.vue`
- [ ] `web/server/vue-cli/src/components/Product/EditProductBtn.vue`
- [ ] `web/server/vue-cli/src/components/Product/SelectConfidentialityItem.vue`
- [ ] `web/server/vue-cli/src/components/Product/ProductNameColumn.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermission.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/EditProductPermission.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/ProductUserPermission.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/BaseProductPermission.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermissionBtn.vue`
- [ ] `web/server/vue-cli/src/components/Product/Permission/ProductGroupPermission.vue`

### Report Components
- [ ] `web/server/vue-cli/src/components/Report/Report.vue`
- [ ] `web/server/vue-cli/src/components/Report/SelectReviewStatus.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportStepMessage.vue`
- [ ] `web/server/vue-cli/src/components/Report/SelectSameReportItem.vue`
- [ ] `web/server/vue-cli/src/components/Report/SelectSameReport.vue`
- [ ] `web/server/vue-cli/src/components/Report/SelectReviewStatusItem.vue`
- [ ] `web/server/vue-cli/src/components/Report/AnalysisInfoBtn.vue`
- [ ] `web/server/vue-cli/src/components/Report/Git/ToggleBlameViewBtn.vue`
- [ ] `web/server/vue-cli/src/components/Report/Git/GitBlameLine.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/ReportCount.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/ReportFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/ClearAllFilters.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/RemoveFilteredReports.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportTree/ReportStepIcon.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportTree/ReportTree.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportTree/ReportTreeIcon.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportTree/ReportTreeLabel.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportInfo/ReportInfoButton.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportInfo/ShowReportInfoDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportInfo/ReportInfo.vue`

### Report Filter Components
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReviewStatusFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToDiffTypeFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CleanupPlanFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CheckerNameFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SourceComponentFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionDateFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToRunFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReportStatusFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CheckerMessageFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/FilePathFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionStatusFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/AnalyzerNameFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToOpenReportsDateFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReportHashFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BugPathLengthFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/FixDateFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionDateFilterIcon.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineTagItems.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/UniqueFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineOpenReportsDateFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SeverityFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineRunFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/TestcaseFilter.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/SelectOption.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/Items.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/SelectedToolbarTitleItems.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/ItemsSelected.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/AnywhereOnReportPath.vue`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/Layout/FilterToolbar.vue`

### Comment Components
- [ ] `web/server/vue-cli/src/components/Report/Comment/RemoveCommentBtn.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/UserComment.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/NewComment.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/EditCommentDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/EditCommentBtn.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/ReportComments.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/SystemComment.vue`
- [ ] `web/server/vue-cli/src/components/Report/Comment/RemoveCommentDialog.vue`

### Cleanup Plan Components
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanTab.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/ListCleanupPlans.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanList.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanSubtitle.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/ListCleanupPlansTable.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/RemoveCleanupPlanDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/DueDateMenu.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/EditCleanupPlanDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/ManageCleanupPlanDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/SetCleanupPlanBtn.vue`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/DueDate.vue`

### Source Component Components
- [ ] `web/server/vue-cli/src/components/Report/SourceComponent/SourceComponentTooltip.vue`
- [ ] `web/server/vue-cli/src/components/Report/SourceComponent/ListSourceComponents.vue`
- [ ] `web/server/vue-cli/src/components/Report/SourceComponent/RemoveSourceComponentDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/SourceComponent/EditSourceComponentDialog.vue`
- [ ] `web/server/vue-cli/src/components/Report/SourceComponent/ManageSourceComponentDialog.vue`

### Run Components
- [ ] `web/server/vue-cli/src/components/Run/RunFilterToolbar.vue`
- [ ] `web/server/vue-cli/src/components/Run/AnalyzerStatisticsDialog.vue`
- [ ] `web/server/vue-cli/src/components/Run/RunNameColumn.vue`
- [ ] `web/server/vue-cli/src/components/Run/AnalysisInfoBtn.vue`
- [ ] `web/server/vue-cli/src/components/Run/VersionTag.vue`
- [ ] `web/server/vue-cli/src/components/Run/AnalyzerStatisticsBtn.vue`
- [ ] `web/server/vue-cli/src/components/Run/ShowStatisticsBtn.vue`
- [ ] `web/server/vue-cli/src/components/Run/DeleteRunBtn.vue`
- [ ] `web/server/vue-cli/src/components/Run/ExpandedRun.vue`
- [ ] `web/server/vue-cli/src/components/Run/RunDescription.vue`

### Icon Components
- [ ] `web/server/vue-cli/src/components/Icons/DetectionStatusIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/ReportStepEnumIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/ConfidentialityIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/ReportStatusIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/ReviewStatusIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/AnalyzerStatisticsIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/UserIcon.vue`
- [ ] `web/server/vue-cli/src/components/Icons/SeverityIcon.vue`

### Layout Components
- [ ] `web/server/vue-cli/src/components/Layout/PersonalAccessTokenBtn.vue`
- [ ] `web/server/vue-cli/src/components/Layout/TheHeader.vue`
- [ ] `web/server/vue-cli/src/components/Layout/HeaderMenuItems.vue`
- [ ] `web/server/vue-cli/src/components/Layout/UserInfoMenu.vue`

### Analysis Info Components
- [ ] `web/server/vue-cli/src/components/AnalysisInfo/Checker.vue`
- [ ] `web/server/vue-cli/src/components/AnalysisInfo/CheckerRows.vue`
- [ ] `web/server/vue-cli/src/components/AnalysisInfo/CheckerGroup.vue`

### New Features Components
- [ ] `web/server/vue-cli/src/components/NewFeatures/NewReleaseItem.vue`
- [ ] `web/server/vue-cli/src/components/NewFeatures/NewFeatureItem.vue`

## Test Files
### Unit Tests
- [ ] `web/server/vue-cli/src/filters/__tests__/truncate.test.js`
- [ ] `web/server/vue-cli/src/filters/__tests__/prettify-date.test.js`
- [ ] `web/server/vue-cli/src/mixins/__tests__/detection-status.mixin.test.js`
- [ ] `web/server/vue-cli/src/mixins/__tests__/severity.mixin.test.js`
- [ ] `web/server/vue-cli/src/mixins/__tests__/bug-path-length-color.mixin.test.js`
- [ ] `web/server/vue-cli/src/mixins/__tests__/review-status.mixin.test.js`
- [ ] `web/server/vue-cli/src/router/__tests__/backward-compatible-url.test.js`
- [ ] `web/server/vue-cli/src/mixins/__tests__/str-to-color.mixin.test.js`

### E2E Tests (Only if CSS selectors change)
- [ ] Review E2E tests after Vuetify 3 migration - may need selector updates

## Mixins (15 files)
- [ ] `web/server/vue-cli/src/mixins/severity.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/bug-path-length-color.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/version.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/confidentiality.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/str-to-color.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/date.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/report-status.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/detection-status.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/to-csv.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/review-status.mixin.js`
- [ ] `web/server/vue-cli/src/mixins/api/analysis-info-handling.mixin.js`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseFilter.mixin.js`
- [ ] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseSelectOptionFilter.mixin.js`
- [ ] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanTab.mixin.js`
- [ ] `web/server/vue-cli/src/components/Product/Permission/PopulatePermissions.mixin.js`

## Store Modules (9 files)
- [ ] `web/server/vue-cli/src/store/modules/run.js`
- [ ] `web/server/vue-cli/src/store/modules/auth.js`
- [ ] `web/server/vue-cli/src/store/modules/server-info.js`
- [ ] `web/server/vue-cli/src/store/modules/report.js`
- [ ] `web/server/vue-cli/src/store/modules/statistics.js`
- [ ] `web/server/vue-cli/src/store/modules/error.js`
- [ ] `web/server/vue-cli/src/store/modules/config.js`
- [ ] `web/server/vue-cli/src/store/modules/product.js`
- [ ] `web/server/vue-cli/src/store/modules/url.js`
- [ ] `web/server/vue-cli/src/store/modules/base-filter.js`

## Filters (4 files) 
- [ ] `web/server/vue-cli/src/filters/index.js` - Remove Vue.filter() calls
- [ ] `web/server/vue-cli/src/filters/truncate.js`
- [ ] `web/server/vue-cli/src/filters/from-unix-time.js`
- [ ] `web/server/vue-cli/src/filters/prettify-date.js`

## Directives (2 files)
- [ ] `web/server/vue-cli/src/directives/index.js`
- [ ] `web/server/vue-cli/src/directives/FillHeightDirective.js`

## Services (Only 1 file with Vue dependency)
- [ ] `web/server/vue-cli/src/services/api/_base.service.js` - Already listed above in event bus section

## Other Files
- [ ] `web/server/vue-cli/src/components/Report/Git/GitBlame.js` - Convert to composition API
- [ ] `web/server/vue-cli/src/variables.scss` - Update Vuetify imports
- [ ] Review other JS files only if they import Vue or use Vue APIs

## Index Files (Simple exports - likely no changes needed)
- [ ] Review index.js files only if imports/exports change

## Utility Files (Only 1 needs changes)
- [ ] `web/server/vue-cli/src/components/Statistics/DefaultStatisticsFilterValues.js` - Uses mixin, needs update
- [ ] Review other utility files only if they import Vue or mixins

## Migration Notes

### Key Changes Needed:
1. **Event Bus Replacement**: Replace `new Vue()` event buses with `provide/inject` or Pinia
2. **API Changes**: 
   - `$listeners` → `$attrs` 
   - `$scopedSlots` → `$slots`
   - Filters removed (move to computed properties or methods)
3. **Component Definition**: `Vue.extend()` → `defineComponent()`
4. **Lifecycle Changes**: Some lifecycle hooks renamed
5. **Vuetify 3**: Major breaking changes in component APIs
6. **Chart.js Integration**: `vue-chartjs` v3 → v4 for Vue 3 compatibility
7. **Build Tools**: Update webpack loaders, ESLint rules, test configuration

### Testing Strategy:
- Run `npm run test:lint` after each change
- Run `npm run test:unit` for unit tests
- Run `npm run test:e2e` for full integration testing
- Manual testing with `npm run server:dev`
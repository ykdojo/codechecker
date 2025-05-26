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
- [x] `web/server/vue-cli/src/services/api/_base.service.js` - Replace event bus
- [x] `web/server/vue-cli/src/views/Statistics.vue` - Replace event bus
- [x] `web/server/vue-cli/src/components/Report/Report.vue` - Replace event bus  
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseSelectOptionFilter.mixin.js` - Replace event bus
- [x] `web/server/vue-cli/src/components/Report/Comment/ReportComments.vue` - Replace event bus
- [x] `web/server/vue-cli/src/components/ReviewStatus/ListReviewStatusRules.vue` - Replace event bus
- [x] `web/server/vue-cli/src/components/Product/EditProductBtn.vue` - Replace event bus
- [x] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermissionBtn.vue` - Replace event bus

### Files using `Vue.extend()`
- [x] `web/server/vue-cli/src/components/Report/Report.vue` - Replace `Vue.extend()` with `defineComponent()`
- [x] `web/server/vue-cli/src/components/Report/Git/GitBlame.js` - Replace `Vue.extend()` with `defineComponent()`

## All Vue Components (134 files)
### Views
- [x] `web/server/vue-cli/src/App.vue`
- [x] `web/server/vue-cli/src/views/Reports.vue`
- [x] `web/server/vue-cli/src/views/SourceComponent.vue`
- [x] `web/server/vue-cli/src/views/Login.vue`
- [x] `web/server/vue-cli/src/views/ReviewStatusRules.vue`
- [x] `web/server/vue-cli/src/views/ReportDetail.vue`
- [x] `web/server/vue-cli/src/views/RunList.vue`
- [x] `web/server/vue-cli/src/views/Statistics.vue`
- [x] `web/server/vue-cli/src/views/NewFeatures.vue`
- [x] `web/server/vue-cli/src/views/CleanupPlan.vue`
- [x] `web/server/vue-cli/src/views/ProductDetail.vue`
- [x] `web/server/vue-cli/src/views/RunDetail.vue`
- [x] `web/server/vue-cli/src/views/Userguide.vue`
- [x] `web/server/vue-cli/src/views/NotFound.vue`
- [x] `web/server/vue-cli/src/views/OAuthLogin.vue`
- [x] `web/server/vue-cli/src/views/Products.vue`

### Core Components
- [x] `web/server/vue-cli/src/components/TooltipHelpIcon.vue`
- [x] `web/server/vue-cli/src/components/ConfirmDialog.vue`
- [x] `web/server/vue-cli/src/components/CountChips.vue`
- [x] `web/server/vue-cli/src/components/DateTimePicker.vue`
- [x] `web/server/vue-cli/src/components/AnalysisInfoDialog.vue`
- [x] `web/server/vue-cli/src/components/Alerts.vue`
- [x] `web/server/vue-cli/src/components/BulbMessage.vue`
- [x] `web/server/vue-cli/src/components/CopyBtn.vue`
- [x] `web/server/vue-cli/src/components/CheckerDocumentationDialog.vue`
- [x] `web/server/vue-cli/src/components/Errors.vue`

### Statistics Components
- [x] `web/server/vue-cli/src/components/Statistics/ReportDiffCount.vue`
- [x] `web/server/vue-cli/src/components/Statistics/StatisticsDialog.vue`
- [x] `web/server/vue-cli/src/components/Statistics/UniqueStatWarning.vue`
- [x] `web/server/vue-cli/src/components/Statistics/BaseStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/BaseStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Severity/SeverityStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Severity/SeverityStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Checker/CheckerStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Checker/CheckerStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Component/ComponentStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Component/ComponentStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Component/ExpandedItem.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Guideline/GuidelineStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Guideline/GuidelineStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/CheckerCoverage/CheckerCoverageStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/CheckerCoverage/CheckerCoverageStatisticsTable.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/Reports.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/FailedFilesDialog.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/SingleLineWidget.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/OutstandingReportsChart.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/Overview.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatistics.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatisticsChart.vue`
- [x] `web/server/vue-cli/src/components/Statistics/Overview/ComponentSeverityStatistics/ComponentSeverityStatisticsTable.vue`

### Review Status Components
- [x] `web/server/vue-cli/src/components/ReviewStatus/ReviewStatusLabel.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/ListReviewStatusRules.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/RemoveFilteredRulesDialog.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/EditReviewStatusRuleDialog.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/ReviewStatusRuleFilter.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/SelectReviewStatus.vue`
- [x] `web/server/vue-cli/src/components/ReviewStatus/RemoveReviewStatusRuleDialog.vue`

### Product Components
- [x] `web/server/vue-cli/src/components/Product/ProductConfigForm.vue`
- [x] `web/server/vue-cli/src/components/Product/DeleteProductBtn.vue`
- [x] `web/server/vue-cli/src/components/Product/EditAnnouncementBtn.vue`
- [x] `web/server/vue-cli/src/components/Product/NewProductBtn.vue`
- [x] `web/server/vue-cli/src/components/Product/EditProductBtn.vue`
- [x] `web/server/vue-cli/src/components/Product/SelectConfidentialityItem.vue`
- [x] `web/server/vue-cli/src/components/Product/ProductNameColumn.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermission.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/EditProductPermission.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/ProductUserPermission.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/BaseProductPermission.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/EditGlobalPermissionBtn.vue`
- [x] `web/server/vue-cli/src/components/Product/Permission/ProductGroupPermission.vue`

### Report Components
- [x] `web/server/vue-cli/src/components/Report/Report.vue`
- [x] `web/server/vue-cli/src/components/Report/SelectReviewStatus.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportStepMessage.vue`
- [x] `web/server/vue-cli/src/components/Report/SelectSameReportItem.vue`
- [x] `web/server/vue-cli/src/components/Report/SelectSameReport.vue`
- [x] `web/server/vue-cli/src/components/Report/SelectReviewStatusItem.vue`
- [x] `web/server/vue-cli/src/components/Report/AnalysisInfoBtn.vue`
- [x] `web/server/vue-cli/src/components/Report/Git/ToggleBlameViewBtn.vue`
- [x] `web/server/vue-cli/src/components/Report/Git/GitBlameLine.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/ReportCount.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/ReportFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/ClearAllFilters.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/RemoveFilteredReports.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportTree/ReportStepIcon.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportTree/ReportTree.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportTree/ReportTreeIcon.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportTree/ReportTreeLabel.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportInfo/ReportInfoButton.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportInfo/ShowReportInfoDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportInfo/ReportInfo.vue`

### Report Filter Components
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReviewStatusFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToDiffTypeFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CleanupPlanFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CheckerNameFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SourceComponentFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionDateFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToRunFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReportStatusFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/CheckerMessageFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/FilePathFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionStatusFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/AnalyzerNameFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ComparedToOpenReportsDateFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/ReportHashFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BugPathLengthFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/FixDateFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/DetectionDateFilterIcon.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineTagItems.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/UniqueFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineOpenReportsDateFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SeverityFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaselineRunFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/TestcaseFilter.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/SelectOption.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/Items.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/SelectedToolbarTitleItems.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/ItemsSelected.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/SelectOption/AnywhereOnReportPath.vue`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/Layout/FilterToolbar.vue`

### Comment Components
- [x] `web/server/vue-cli/src/components/Report/Comment/RemoveCommentBtn.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/UserComment.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/NewComment.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/EditCommentDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/EditCommentBtn.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/ReportComments.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/SystemComment.vue`
- [x] `web/server/vue-cli/src/components/Report/Comment/RemoveCommentDialog.vue`

### Cleanup Plan Components
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanTab.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/ListCleanupPlans.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanList.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanSubtitle.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/ListCleanupPlansTable.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/RemoveCleanupPlanDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/DueDateMenu.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/EditCleanupPlanDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/ManageCleanupPlanDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/SetCleanupPlanBtn.vue`
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/DueDate.vue`

### Source Component Components
- [x] `web/server/vue-cli/src/components/Report/SourceComponent/SourceComponentTooltip.vue`
- [x] `web/server/vue-cli/src/components/Report/SourceComponent/ListSourceComponents.vue`
- [x] `web/server/vue-cli/src/components/Report/SourceComponent/RemoveSourceComponentDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/SourceComponent/EditSourceComponentDialog.vue`
- [x] `web/server/vue-cli/src/components/Report/SourceComponent/ManageSourceComponentDialog.vue`

### Run Components
- [x] `web/server/vue-cli/src/components/Run/RunFilterToolbar.vue`
- [x] `web/server/vue-cli/src/components/Run/AnalyzerStatisticsDialog.vue`
- [x] `web/server/vue-cli/src/components/Run/RunNameColumn.vue`
- [x] `web/server/vue-cli/src/components/Run/AnalysisInfoBtn.vue`
- [x] `web/server/vue-cli/src/components/Run/VersionTag.vue`
- [x] `web/server/vue-cli/src/components/Run/AnalyzerStatisticsBtn.vue`
- [x] `web/server/vue-cli/src/components/Run/ShowStatisticsBtn.vue`
- [x] `web/server/vue-cli/src/components/Run/DeleteRunBtn.vue`
- [x] `web/server/vue-cli/src/components/Run/ExpandedRun.vue`
- [x] `web/server/vue-cli/src/components/Run/RunDescription.vue`

### Icon Components
- [x] `web/server/vue-cli/src/components/Icons/DetectionStatusIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/ReportStepEnumIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/ConfidentialityIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/ReportStatusIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/ReviewStatusIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/AnalyzerStatisticsIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/UserIcon.vue`
- [x] `web/server/vue-cli/src/components/Icons/SeverityIcon.vue`

### Layout Components
- [x] `web/server/vue-cli/src/components/Layout/PersonalAccessTokenBtn.vue`
- [x] `web/server/vue-cli/src/components/Layout/TheHeader.vue`
- [x] `web/server/vue-cli/src/components/Layout/HeaderMenuItems.vue`
- [x] `web/server/vue-cli/src/components/Layout/UserInfoMenu.vue`

### Analysis Info Components
- [x] `web/server/vue-cli/src/components/AnalysisInfo/Checker.vue`
- [x] `web/server/vue-cli/src/components/AnalysisInfo/CheckerRows.vue`
- [x] `web/server/vue-cli/src/components/AnalysisInfo/CheckerGroup.vue`

### New Features Components
- [x] `web/server/vue-cli/src/components/NewFeatures/NewReleaseItem.vue`
- [x] `web/server/vue-cli/src/components/NewFeatures/NewFeatureItem.vue`

## Test Files
### Unit Tests
- [x] `web/server/vue-cli/src/filters/__tests__/truncate.test.js`
- [x] `web/server/vue-cli/src/filters/__tests__/prettify-date.test.js`
- [x] `web/server/vue-cli/src/mixins/__tests__/detection-status.mixin.test.js`
- [x] `web/server/vue-cli/src/mixins/__tests__/severity.mixin.test.js`
- [x] `web/server/vue-cli/src/mixins/__tests__/bug-path-length-color.mixin.test.js`
- [x] `web/server/vue-cli/src/mixins/__tests__/review-status.mixin.test.js`
- [x] `web/server/vue-cli/src/router/__tests__/backward-compatible-url.test.js`
- [x] `web/server/vue-cli/src/mixins/__tests__/str-to-color.mixin.test.js`

### E2E Tests (Only if CSS selectors change)
- [x] Review E2E tests after Vuetify 3 migration - may need selector updates

## Mixins (15 files)
- [x] `web/server/vue-cli/src/mixins/severity.mixin.js`
- [x] `web/server/vue-cli/src/mixins/bug-path-length-color.mixin.js`
- [x] `web/server/vue-cli/src/mixins/version.mixin.js`
- [x] `web/server/vue-cli/src/mixins/confidentiality.mixin.js`
- [x] `web/server/vue-cli/src/mixins/str-to-color.mixin.js`
- [x] `web/server/vue-cli/src/mixins/date.mixin.js`
- [x] `web/server/vue-cli/src/mixins/report-status.mixin.js`
- [x] `web/server/vue-cli/src/mixins/detection-status.mixin.js`
- [x] `web/server/vue-cli/src/mixins/to-csv.mixin.js`
- [x] `web/server/vue-cli/src/mixins/review-status.mixin.js`
- [x] `web/server/vue-cli/src/mixins/api/analysis-info-handling.mixin.js`
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseFilter.mixin.js` (converted to composable)
- [x] `web/server/vue-cli/src/components/Report/ReportFilter/Filters/BaseSelectOptionFilter.mixin.js` (converted to composable)
- [x] `web/server/vue-cli/src/components/Report/CleanupPlan/CleanupPlanTab.mixin.js`
- [x] `web/server/vue-cli/src/components/Product/Permission/PopulatePermissions.mixin.js`

## Store Modules (10 files)
- [x] `web/server/vue-cli/src/store/modules/run.js`
- [x] `web/server/vue-cli/src/store/modules/auth.js`
- [x] `web/server/vue-cli/src/store/modules/server-info.js`
- [x] `web/server/vue-cli/src/store/modules/report.js`
- [x] `web/server/vue-cli/src/store/modules/statistics.js`
- [x] `web/server/vue-cli/src/store/modules/error.js`
- [x] `web/server/vue-cli/src/store/modules/config.js`
- [x] `web/server/vue-cli/src/store/modules/product.js`
- [x] `web/server/vue-cli/src/store/modules/url.js`
- [x] `web/server/vue-cli/src/store/modules/base-filter.js`

## Filters (4 files) 
- [x] `web/server/vue-cli/src/filters/index.js` - Remove Vue.filter() calls
- [x] `web/server/vue-cli/src/filters/truncate.js`
- [x] `web/server/vue-cli/src/filters/from-unix-time.js`
- [x] `web/server/vue-cli/src/filters/prettify-date.js`

## Directives (2 files)
- [x] `web/server/vue-cli/src/directives/index.js`
- [x] `web/server/vue-cli/src/directives/FillHeightDirective.js`

## Services (Only 1 file with Vue dependency)
- [x] `web/server/vue-cli/src/services/api/_base.service.js` - Already listed above in event bus section

## Other Files
- [x] `web/server/vue-cli/src/components/Report/Git/GitBlame.js` - Convert to composition API
- [x] `web/server/vue-cli/src/variables.scss` - Update Vuetify imports
- [x] Review other JS files only if they import Vue or use Vue APIs

## Index Files (Simple exports - likely no changes needed)
- [x] Review index.js files only if imports/exports change

## Utility Files (Only 1 needs changes)
- [x] `web/server/vue-cli/src/components/Statistics/DefaultStatisticsFilterValues.js` - Uses mixin, needs update
- [x] Review other utility files only if they import Vue or mixins

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
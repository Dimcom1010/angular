// типы и методы
type RouteTypeDefault = { path: string; short: string };
const CombineRoute = (route: RouteTypeDefault, short: string): RouteTypeDefault => ({
    path: `${route.path}/${short}`,
    short,
});
type RouteTypeTree = {
    Auth: RouteTypeDefault;
    App: {
        Nsi?: {
            Index?: RouteTypeDefault;
            Analisys?: RouteTypeDefault;
            Requests?: RouteTypeDefault;
            Handbook?: {
                Catalog?: RouteTypeDefault;
                Mtr?: RouteTypeDefault;
                Okp?: RouteTypeDefault;
                Enterprises?: RouteTypeDefault;
                Divisions?: RouteTypeDefault;
                Area?: RouteTypeDefault;
                Countries?: RouteTypeDefault;
                Financing?: RouteTypeDefault;
                Procedures?: RouteTypeDefault;
                Kindoforg?: RouteTypeDefault;
                Storage?: RouteTypeDefault;
                Delivery?: RouteTypeDefault;
                Units?: RouteTypeDefault;
                Counterparties?: RouteTypeDefault;
                Regulations?: RouteTypeDefault;
                EnsuringObjects?: RouteTypeDefault;
                Veds?: RouteTypeDefault;
            } & RouteTypeDefault;
            Asot?: {
                Professions?: RouteTypeDefault;
                OrderWorkTypes?: RouteTypeDefault;
                ViolationTypes?: RouteTypeDefault;
            } & RouteTypeDefault;
            IsMid?: {
                Invest?: RouteTypeDefault;
                Costs?: RouteTypeDefault;
                CostDocTypes?: RouteTypeDefault;
                PayPurposes?: RouteTypeDefault;
                ObjStage?: RouteTypeDefault;
                Directive?: RouteTypeDefault;
                PowerName?: RouteTypeDefault;
                TypeConstructions?: RouteTypeDefault;
                Oked?: RouteTypeDefault;
            } & RouteTypeDefault;
            Soato?: {
                Ars?: RouteTypeDefault;
                Regs?: RouteTypeDefault;
                S?: RouteTypeDefault;
                Stes?: RouteTypeDefault;
            } & RouteTypeDefault;
            TechnicalExperts?: RouteTypeDefault;
        } & RouteTypeDefault;

        Buy?: {
            Dashboard?: RouteTypeDefault;
            Index?: RouteTypeDefault;
            Report?: {
                Prices?: RouteTypeDefault;
                PurchaseVolume?: RouteTypeDefault;
                Remnant?: RouteTypeDefault;
                Buy?: RouteTypeDefault;
                Form1?: RouteTypeDefault;
                Form2?: RouteTypeDefault;
                Form3?: RouteTypeDefault;
                Form4?: RouteTypeDefault;
                Form5?: RouteTypeDefault;
                Form6?: RouteTypeDefault;
                ReportCableAndWirePurchase?: RouteTypeDefault;
                VolumeMtr?: RouteTypeDefault;
                ReportProcedure?: RouteTypeDefault;
            } & RouteTypeDefault;
            Purchase?: {
                Proposal?: RouteTypeDefault;
                TechnicalApplications?: {
                    List?: RouteTypeDefault;
                } & RouteTypeDefault;
                Report?: {
                    ReportTimingBesk?: RouteTypeDefault;
                } & RouteTypeDefault;
                PurshasesPlan?: {
                    List?: RouteTypeDefault;
                    Project?: RouteTypeDefault;
                } & RouteTypeDefault;
            } & RouteTypeDefault;
            ProlongUpload?: RouteTypeDefault;
        } & RouteTypeDefault;
        Remnant?: {
            Dashboard?: RouteTypeDefault;
            Index?: RouteTypeDefault;
            Reports?: {
                BalanceReport?: RouteTypeDefault;
                InventoryLevelReport?: RouteTypeDefault;
                ChangingUnused?: RouteTypeDefault;
                TaskReduce?: RouteTypeDefault;
            } & RouteTypeDefault;
            ProlongUpload?: RouteTypeDefault;
        } & RouteTypeDefault;
        Mid?: {
            Dashboard?: RouteTypeDefault;
            Objects?: RouteTypeDefault;
            Handbook?: {
                Invest?: RouteTypeDefault;
                Enterprises?: RouteTypeDefault;
                Financing?: RouteTypeDefault;
                Costs?: RouteTypeDefault;
                CostDocTypes?: RouteTypeDefault;
                PayPurposes?: RouteTypeDefault;
                ObjStage?: RouteTypeDefault;
                Directive?: RouteTypeDefault;
                PowerName?: RouteTypeDefault;
                TypeConstructions?: RouteTypeDefault;
                Oked?: RouteTypeDefault;
            } & RouteTypeDefault;
            Monitoring?: {
                List?: RouteTypeDefault;
                Rup?: RouteTypeDefault;
                GandsLodash?: RouteTypeDefault;
                Financing?: RouteTypeDefault;
                Mastering?: RouteTypeDefault;
                Reports?: {
                    Different?: RouteTypeDefault;
                    Financing?: { List?: RouteTypeDefault; Document?: RouteTypeDefault } & RouteTypeDefault;
                    Mastering?: { List?: RouteTypeDefault; Document?: RouteTypeDefault } & RouteTypeDefault;
                } & RouteTypeDefault;
                ElectricGrids?: RouteTypeDefault;
            } & RouteTypeDefault;
            InvestPrograms?: {
                ActingList?: RouteTypeDefault;
                List?: RouteTypeDefault;
                ArchiveList?: RouteTypeDefault;
                Project?: RouteTypeDefault;
                ProjectJoin?: RouteTypeDefault;
                Summary?: RouteTypeDefault;
            } & RouteTypeDefault;
            StatisticalReports?: {
                IS6?: { List?: RouteTypeDefault; Report?: RouteTypeDefault } & RouteTypeDefault;
                IS4?: { List?: RouteTypeDefault; Report?: RouteTypeDefault } & RouteTypeDefault;
                IS1?: { List?: RouteTypeDefault; Report?: RouteTypeDefault } & RouteTypeDefault;
            } & RouteTypeDefault;
        } & RouteTypeDefault;
        Asot?: {
            Employees?: RouteTypeDefault;
            WorkPermits?: RouteTypeDefault;
            Handbook?: {
                Professions?: RouteTypeDefault;
                OrderWorkTypes?: RouteTypeDefault;
                ViolationTypes?: RouteTypeDefault;
            } & RouteTypeDefault;
        } & RouteTypeDefault;
        Journal?: {
            Audit?: RouteTypeDefault;
            AuditRouting?: RouteTypeDefault;
        } & RouteTypeDefault;
        Administration?: {
            Users?: RouteTypeDefault;
            SendPush?: RouteTypeDefault;
        } & RouteTypeDefault;
        Testing?: {
            Sign?: RouteTypeDefault;
        } & RouteTypeDefault;
    } & RouteTypeDefault;
};

//========================================================================================================================
const RouteApp: RouteTypeTree = {
    Auth: CombineRoute({ path: '', short: '' }, 'auth'),
    App: CombineRoute({ path: '', short: '' }, 'app'),
};

// NSI
RouteApp.App.Nsi = CombineRoute(RouteApp.App, 'nsi');
RouteApp.App.Nsi.Index = CombineRoute(RouteApp.App.Nsi, 'index');
RouteApp.App.Nsi.Requests = CombineRoute(RouteApp.App.Nsi, 'requests');
RouteApp.App.Nsi.Analisys = CombineRoute(RouteApp.App.Nsi, 'analisys');
RouteApp.App.Nsi.TechnicalExperts = CombineRoute(RouteApp.App.Nsi, 'technicalexperts');

// NSI-HANDBOOK
RouteApp.App.Nsi.Handbook = CombineRoute(RouteApp.App.Nsi, 'handbook');
RouteApp.App.Nsi.Handbook.Catalog = CombineRoute(RouteApp.App.Nsi.Handbook, 'catalog');
RouteApp.App.Nsi.Handbook.Mtr = CombineRoute(RouteApp.App.Nsi.Handbook, 'mtr');
RouteApp.App.Nsi.Handbook.Okp = CombineRoute(RouteApp.App.Nsi.Handbook, 'okp');
RouteApp.App.Nsi.Handbook.Enterprises = CombineRoute(RouteApp.App.Nsi.Handbook, 'enterprises');
RouteApp.App.Nsi.Handbook.Divisions = CombineRoute(RouteApp.App.Nsi.Handbook, 'divisions');
RouteApp.App.Nsi.Handbook.Area = CombineRoute(RouteApp.App.Nsi.Handbook, 'area');
RouteApp.App.Nsi.Handbook.Countries = CombineRoute(RouteApp.App.Nsi.Handbook, 'countries');
RouteApp.App.Nsi.Handbook.Financing = CombineRoute(RouteApp.App.Nsi.Handbook, 'financing');
RouteApp.App.Nsi.Handbook.Procedures = CombineRoute(RouteApp.App.Nsi.Handbook, 'procedures');
RouteApp.App.Nsi.Handbook.Kindoforg = CombineRoute(RouteApp.App.Nsi.Handbook, 'kindoforg');
RouteApp.App.Nsi.Handbook.Storage = CombineRoute(RouteApp.App.Nsi.Handbook, 'storage');
RouteApp.App.Nsi.Handbook.Delivery = CombineRoute(RouteApp.App.Nsi.Handbook, 'delivery');
RouteApp.App.Nsi.Handbook.Units = CombineRoute(RouteApp.App.Nsi.Handbook, 'units');
RouteApp.App.Nsi.Handbook.Counterparties = CombineRoute(RouteApp.App.Nsi.Handbook, 'counterparties');
RouteApp.App.Nsi.Handbook.Regulations = CombineRoute(RouteApp.App.Nsi.Handbook, 'regulations');
RouteApp.App.Nsi.Handbook.EnsuringObjects = CombineRoute(RouteApp.App.Nsi.Handbook, 'ensuring-objects');
RouteApp.App.Nsi.Handbook.Veds = CombineRoute(RouteApp.App.Nsi.Handbook, 'veds');

// NSI-Asot
RouteApp.App.Nsi.Asot = CombineRoute(RouteApp.App.Nsi, 'asot');
RouteApp.App.Nsi.Asot.Professions = CombineRoute(RouteApp.App.Nsi.Asot, 'professions');
RouteApp.App.Nsi.Asot.OrderWorkTypes = CombineRoute(RouteApp.App.Nsi.Asot, 'order-work-types');
RouteApp.App.Nsi.Asot.ViolationTypes = CombineRoute(RouteApp.App.Nsi.Asot, 'violation-types');

// NSI-ISMID
RouteApp.App.Nsi.IsMid = CombineRoute(RouteApp.App.Nsi, 'ismid');
RouteApp.App.Nsi.IsMid.Invest = CombineRoute(RouteApp.App.Nsi.IsMid, 'invest');
RouteApp.App.Nsi.IsMid.Costs = CombineRoute(RouteApp.App.Nsi.IsMid, 'costs');
RouteApp.App.Nsi.IsMid.CostDocTypes = CombineRoute(RouteApp.App.Nsi.IsMid, 'costDocTypes');
RouteApp.App.Nsi.IsMid.PayPurposes = CombineRoute(RouteApp.App.Nsi.IsMid, 'payPurposes');
RouteApp.App.Nsi.IsMid.ObjStage = CombineRoute(RouteApp.App.Nsi.IsMid, 'objStages');
RouteApp.App.Nsi.IsMid.Directive = CombineRoute(RouteApp.App.Nsi.IsMid, 'directive');
RouteApp.App.Nsi.IsMid.PowerName = CombineRoute(RouteApp.App.Nsi.IsMid, 'powerName');
RouteApp.App.Nsi.IsMid.TypeConstructions = CombineRoute(RouteApp.App.Nsi.IsMid, 'typeConstructions');
RouteApp.App.Nsi.IsMid.Oked = CombineRoute(RouteApp.App.Nsi.IsMid, 'oked');

// NSI-SOATO
RouteApp.App.Nsi.Soato = CombineRoute(RouteApp.App.Nsi, 'soato');
RouteApp.App.Nsi.Soato.Ars = CombineRoute(RouteApp.App.Nsi.Soato, 'ars');
RouteApp.App.Nsi.Soato.Regs = CombineRoute(RouteApp.App.Nsi.Soato, 'regs');
RouteApp.App.Nsi.Soato.S = CombineRoute(RouteApp.App.Nsi.Soato, 's');
RouteApp.App.Nsi.Soato.Stes = CombineRoute(RouteApp.App.Nsi.Soato, 'stes');

// BUY
RouteApp.App.Buy = CombineRoute(RouteApp.App, 'buy');
RouteApp.App.Buy.Index = CombineRoute(RouteApp.App.Buy, 'index');
RouteApp.App.Buy.Dashboard = CombineRoute(RouteApp.App.Buy, 'dashboard');
RouteApp.App.Buy.ProlongUpload = CombineRoute(RouteApp.App.Buy, 'prolong-upload');

// BUY-REPORT
RouteApp.App.Buy.Report = CombineRoute(RouteApp.App.Buy, 'report');
RouteApp.App.Buy.Report.Remnant = CombineRoute(RouteApp.App.Buy.Report, 'remnant');
RouteApp.App.Buy.Report.Prices = CombineRoute(RouteApp.App.Buy.Report, 'prices');
RouteApp.App.Buy.Report.PurchaseVolume = CombineRoute(RouteApp.App.Buy.Report, 'purchase-volume');
RouteApp.App.Buy.Report.Buy = CombineRoute(RouteApp.App.Buy.Report, 'buy');
RouteApp.App.Buy.Report.Form1 = CombineRoute(RouteApp.App.Buy.Report, 'form1');
RouteApp.App.Buy.Report.Form2 = CombineRoute(RouteApp.App.Buy.Report, 'form2');
RouteApp.App.Buy.Report.Form3 = CombineRoute(RouteApp.App.Buy.Report, 'form3');
RouteApp.App.Buy.Report.Form4 = CombineRoute(RouteApp.App.Buy.Report, 'form4');
RouteApp.App.Buy.Report.Form5 = CombineRoute(RouteApp.App.Buy.Report, 'form5');
RouteApp.App.Buy.Report.Form6 = CombineRoute(RouteApp.App.Buy.Report, 'form6');
RouteApp.App.Buy.Report.ReportCableAndWirePurchase = CombineRoute(RouteApp.App.Buy.Report, 'сable-and-wire-purchase');
RouteApp.App.Buy.Report.ReportProcedure = CombineRoute(RouteApp.App.Buy.Report, 'report-procedure');
RouteApp.App.Buy.Report.VolumeMtr = CombineRoute(RouteApp.App.Buy.Report, 'volume-mtr');

// ASOT
RouteApp.App.Asot = CombineRoute(RouteApp.App, 'asot');
RouteApp.App.Asot.Employees = CombineRoute(RouteApp.App.Asot, 'employees');
RouteApp.App.Asot.WorkPermits = CombineRoute(RouteApp.App.Asot, 'work-permits');

// ASOT-HANDBOOK
RouteApp.App.Asot.Handbook = CombineRoute(RouteApp.App.Asot, 'handbook');
RouteApp.App.Asot.Handbook.Professions = CombineRoute(RouteApp.App.Asot.Handbook, 'professions');
RouteApp.App.Asot.Handbook.OrderWorkTypes = CombineRoute(RouteApp.App.Asot.Handbook, 'order-work-types');
RouteApp.App.Asot.Handbook.ViolationTypes = CombineRoute(RouteApp.App.Asot.Handbook, 'violation-types');

// BUY-CENTRALIZED-PURSHASES
RouteApp.App.Buy.Purchase = CombineRoute(RouteApp.App.Buy, 'centralized-purshases');
RouteApp.App.Buy.Purchase.Proposal = CombineRoute(RouteApp.App.Buy.Purchase, 'proposal');

// BUY-CENTRALIZED-TECHNICAL-APPLICATIONS
RouteApp.App.Buy.Purchase.TechnicalApplications = CombineRoute(RouteApp.App.Buy.Purchase, 'technical-applications');
RouteApp.App.Buy.Purchase.TechnicalApplications.List = CombineRoute(
    RouteApp.App.Buy.Purchase.TechnicalApplications,
    'list',
);

// BUY-CENTRALIZED-PURSHASES-REPORT
RouteApp.App.Buy.Purchase.Report = CombineRoute(RouteApp.App.Buy.Purchase, 'report');
RouteApp.App.Buy.Purchase.Report.ReportTimingBesk = CombineRoute(
    RouteApp.App.Buy.Purchase.Report,
    'report-timing-besk',
);

// BUY-CENTRALIZED-PURSHASES-PLAN
RouteApp.App.Buy.Purchase.PurshasesPlan = CombineRoute(RouteApp.App.Buy.Purchase, 'plan');
RouteApp.App.Buy.Purchase.PurshasesPlan.List = CombineRoute(RouteApp.App.Buy.Purchase.PurshasesPlan, 'list');
RouteApp.App.Buy.Purchase.PurshasesPlan.Project = CombineRoute(RouteApp.App.Buy.Purchase.PurshasesPlan, 'project');

// REMNANT
RouteApp.App.Remnant = CombineRoute(RouteApp.App, 'remnant');
RouteApp.App.Remnant.Index = CombineRoute(RouteApp.App.Remnant, 'index');
RouteApp.App.Remnant.Dashboard = CombineRoute(RouteApp.App.Remnant, 'dashboard');
RouteApp.App.Remnant.ProlongUpload = CombineRoute(RouteApp.App.Remnant, 'prolong-upload');

// REMNANT-REPORTS
RouteApp.App.Remnant.Reports = CombineRoute(RouteApp.App.Remnant, 'reports');
RouteApp.App.Remnant.Reports.BalanceReport = CombineRoute(RouteApp.App.Remnant.Reports, 'balance-report');
RouteApp.App.Remnant.Reports.InventoryLevelReport = CombineRoute(RouteApp.App.Remnant.Reports, 'inventory-level');
RouteApp.App.Remnant.Reports.ChangingUnused = CombineRoute(RouteApp.App.Remnant.Reports, 'changing-unused');
RouteApp.App.Remnant.Reports.TaskReduce = CombineRoute(RouteApp.App.Remnant.Reports, 'task-reduce');

// MID
RouteApp.App.Mid = CombineRoute(RouteApp.App, 'ismid');
RouteApp.App.Mid.Objects = CombineRoute(RouteApp.App.Mid, 'objects');
RouteApp.App.Mid.Dashboard = CombineRoute(RouteApp.App.Mid, 'dashboard');

// MID-HANDBOOK
RouteApp.App.Mid.Handbook = CombineRoute(RouteApp.App.Mid, 'handbook');
RouteApp.App.Mid.Handbook.Invest = CombineRoute(RouteApp.App.Mid.Handbook, 'invest');
RouteApp.App.Mid.Handbook.Enterprises = CombineRoute(RouteApp.App.Mid.Handbook, 'enterprises');
RouteApp.App.Mid.Handbook.Financing = CombineRoute(RouteApp.App.Mid.Handbook, 'financing');
RouteApp.App.Mid.Handbook.Costs = CombineRoute(RouteApp.App.Mid.Handbook, 'costs');
RouteApp.App.Mid.Handbook.CostDocTypes = CombineRoute(RouteApp.App.Mid.Handbook, 'costDocTypes');
RouteApp.App.Mid.Handbook.PayPurposes = CombineRoute(RouteApp.App.Mid.Handbook, 'payPurposes');
RouteApp.App.Mid.Handbook.ObjStage = CombineRoute(RouteApp.App.Mid.Handbook, 'objStages');
RouteApp.App.Mid.Handbook.Directive = CombineRoute(RouteApp.App.Mid.Handbook, 'directive');
RouteApp.App.Mid.Handbook.PowerName = CombineRoute(RouteApp.App.Mid.Handbook, 'powerName');
RouteApp.App.Mid.Handbook.TypeConstructions = CombineRoute(RouteApp.App.Mid.Handbook, 'typeConstructions');
RouteApp.App.Mid.Handbook.Oked = CombineRoute(RouteApp.App.Mid.Handbook, 'oked');

// MID-MONITORING
RouteApp.App.Mid.Monitoring = CombineRoute(RouteApp.App.Mid, 'monitoring');
RouteApp.App.Mid.Monitoring.List = CombineRoute(RouteApp.App.Mid.Monitoring, 'list');
RouteApp.App.Mid.Monitoring.GandsLodash = CombineRoute(RouteApp.App.Mid.Monitoring, 'gands-lodash');
RouteApp.App.Mid.Monitoring.Financing = CombineRoute(RouteApp.App.Mid.Monitoring, 'financing');
RouteApp.App.Mid.Monitoring.Mastering = CombineRoute(RouteApp.App.Mid.Monitoring, 'mastering');
RouteApp.App.Mid.Monitoring.Rup = CombineRoute(RouteApp.App.Mid.Monitoring, 'rup');

// MID-MONITORING-REPORTS
RouteApp.App.Mid.Monitoring.Reports = CombineRoute(RouteApp.App.Mid.Monitoring, 'reports');
RouteApp.App.Mid.Monitoring.Reports.Financing = CombineRoute(RouteApp.App.Mid.Monitoring.Reports, 'financing');
RouteApp.App.Mid.Monitoring.Reports.Mastering = CombineRoute(RouteApp.App.Mid.Monitoring.Reports, 'mastering');
RouteApp.App.Mid.Monitoring.Reports.Different = CombineRoute(RouteApp.App.Mid.Monitoring.Reports, 'different');

// MID-MONITORING-REPORTS-MASTERING
RouteApp.App.Mid.Monitoring.Reports.Mastering.Document = CombineRoute(
    RouteApp.App.Mid.Monitoring.Reports.Mastering,
    'document',
);
RouteApp.App.Mid.Monitoring.Reports.Mastering.List = CombineRoute(
    RouteApp.App.Mid.Monitoring.Reports.Mastering,
    'list',
);

// MID-MONITORING-REPORTS-FINANCING
RouteApp.App.Mid.Monitoring.Reports.Financing.Document = CombineRoute(
    RouteApp.App.Mid.Monitoring.Reports.Financing,
    'document',
);
RouteApp.App.Mid.Monitoring.Reports.Financing.List = CombineRoute(
    RouteApp.App.Mid.Monitoring.Reports.Financing,
    'list',
);
RouteApp.App.Mid.Monitoring.ElectricGrids = CombineRoute(RouteApp.App.Mid.Monitoring, 'electric-grids');

// MID-INVEST-PROGRAMS
RouteApp.App.Mid.InvestPrograms = CombineRoute(RouteApp.App.Mid, 'invest-programs');
RouteApp.App.Mid.InvestPrograms.List = CombineRoute(RouteApp.App.Mid.InvestPrograms, 'list');
RouteApp.App.Mid.InvestPrograms.ActingList = CombineRoute(RouteApp.App.Mid.InvestPrograms, 'acting-list');
RouteApp.App.Mid.InvestPrograms.ArchiveList = CombineRoute(RouteApp.App.Mid.InvestPrograms, 'archive-list');
RouteApp.App.Mid.InvestPrograms.Project = CombineRoute(RouteApp.App.Mid.InvestPrograms, 'project');
RouteApp.App.Mid.InvestPrograms.Summary = CombineRoute(RouteApp.App.Mid.InvestPrograms, 'summary');

// MID-STATISTIC-REPORT
RouteApp.App.Mid.StatisticalReports = CombineRoute(RouteApp.App.Mid, 'statistical-reports');
RouteApp.App.Mid.StatisticalReports.IS1 = CombineRoute(RouteApp.App.Mid.StatisticalReports, 'is-1');
RouteApp.App.Mid.StatisticalReports.IS1.List = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS1, 'list');
RouteApp.App.Mid.StatisticalReports.IS1.Report = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS1, 'report');
RouteApp.App.Mid.StatisticalReports.IS4 = CombineRoute(RouteApp.App.Mid.StatisticalReports, 'is-4');
RouteApp.App.Mid.StatisticalReports.IS4.List = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS4, 'list');
RouteApp.App.Mid.StatisticalReports.IS4.Report = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS4, 'report');
RouteApp.App.Mid.StatisticalReports.IS6 = CombineRoute(RouteApp.App.Mid.StatisticalReports, 'is-6');
RouteApp.App.Mid.StatisticalReports.IS6.List = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS6, 'list');
RouteApp.App.Mid.StatisticalReports.IS6.Report = CombineRoute(RouteApp.App.Mid.StatisticalReports.IS6, 'report');

// JOURNAL
RouteApp.App.Journal = CombineRoute(RouteApp.App, 'journal');
RouteApp.App.Journal.Audit = CombineRoute(RouteApp.App.Journal, 'audit');
RouteApp.App.Journal.AuditRouting = CombineRoute(RouteApp.App.Journal, 'auditRouting');

// ADMINISTRATION
RouteApp.App.Administration = CombineRoute(RouteApp.App, 'administration');
RouteApp.App.Administration.Users = CombineRoute(RouteApp.App.Administration, 'users');
RouteApp.App.Administration.SendPush = CombineRoute(RouteApp.App.Administration, 'send-push');

// TESTING
RouteApp.App.Testing = CombineRoute(RouteApp.App, 'testing');
RouteApp.App.Testing.Sign = CombineRoute(RouteApp.App.Testing, 'sign');

Object.freeze(RouteApp);

export { RouteApp, RouteTypeTree };

import { InjectionToken } from '@angular/core';

export const ROUTE_APP = new InjectionToken<RouteTypeTree>('route-app', {
    providedIn: 'root',
    factory: () => RouteApp,
});

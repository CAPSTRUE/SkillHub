
    window.addEventListener("DOMContentLoaded", () => {
      function escapeHtml(s) {
        return String(s ?? "").replace(/[&<>"']/g, (c) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[c]));
      }

      
      function stripAnswerChoicesFromPrompt(prompt) {
        const lines = String(prompt ?? "").split(/\r?\n/);
        const kept = [];
        for (const ln of lines) {
          const t = String(ln ?? "").trim();
          // Remove A./B./C./D./E. lines from the prompt (choices should appear only as alternatives)
          if (/^[A-E]\.[\s\u00A0]+/.test(t)) continue;
          kept.push(ln);
        }
        // collapse excessive blank lines
        return kept.join("\n").replace(/\n[ \t]*\n+/g, "\n").trimEnd();
      }

      function getPromptForDisplay(q) {
        let p = String(q?.prompt ?? "").replace(/\r/g, "");

        // Convert literal "\n" sequences (common when importing from JSON/JS) into real line breaks
        p = p.replace(/\\n/g, "\n");
        p = p.replace(/\\r/g, "");

        // Normalize bullets/tasks to match PDF layout
        p = p.replace(/—\s*Task\s*(\d+)\s+/gi, "— Task $1\n");
        p = p.replace(/([:.;])\s*\*\s+/g, "$1\n* ");
        p = p.replace(/\n\s*\*\s+/g, "\n* ");

        // Remove common PDF artifacts (page numbers / watermarks) if present in prompt
        p = p.replace(/^\s*\d{1,3}\s*$/gm, "");
        p = p.replace(/^\s*IT Certification Guaranteed.*$/gmi, "");
        p = p.replace(/^\s*The Easy Way!\s*$/gmi, "");

        // Collapse blank lines (PDF page breaks often appear as empty lines)
        p = p.replace(/\n[ \t]*\n+/g, "\n");

        // For regular multiple-choice questions, remove A./B./C./D./E. lines from the prompt
        if (!isDropdownQuestion(q) && Array.isArray(q?.answers) && q.answers.length > 0) {
          p = stripAnswerChoicesFromPrompt(p);
        }

        return p.trimEnd();
      }

function formatPromptHtml(prompt) {
        const raw = String(prompt ?? "");
        let out = escapeHtml(raw);

        // Bold only the question number token (e.g., NO.130)
        const m = out.match(/^(NO\.\d+)/);
        if (m) out = `<b>${m[1]}</b>${out.slice(m[1].length)}`;

        // Preserve PDF-like line breaks
        out = out.replace(/\n/g, "<br>");
        return out;
      }

      const SKILL_TEST_LOOKUP = {
        "language__portuguese-pt": {
                "skill": "Language",
                "test": "Portuguese (PT)",
                "label": "Language / Portuguese (PT)"
        },
        "language__english-en": {
                "skill": "Language",
                "test": "English (EN)",
                "label": "Language / English (EN)"
        },
        "language__spanish-es": {
                "skill": "Language",
                "test": "Spanish (ES)",
                "label": "Language / Spanish (ES)"
        },
        "project-management__agile-scrum": {
                "skill": "Project Management",
                "test": "Agile / Scrum",
                "label": "Project Management / Agile / Scrum"
        },
        "project-management__waterfall": {
                "skill": "Project Management",
                "test": "Waterfall",
                "label": "Project Management / Waterfall"
        },
        "project-management__risk-management": {
                "skill": "Project Management",
                "test": "Risk Management",
                "label": "Project Management / Risk Management"
        },
        "project-management__budget-management": {
                "skill": "Project Management",
                "test": "Budget Management",
                "label": "Project Management / Budget Management"
        },
        "project-management__change-management": {
                "skill": "Project Management",
                "test": "Change Management",
                "label": "Project Management / Change Management"
        },
        "project-management__documentation": {
                "skill": "Project Management",
                "test": "Documentation",
                "label": "Project Management / Documentation"
        },
        "generic-skills__people-management": {
                "skill": "Generic Skills",
                "test": "People Management",
                "label": "Generic Skills / People Management"
        },
        "generic-skills__leadership-skills": {
                "skill": "Generic Skills",
                "test": "Leadership Skills",
                "label": "Generic Skills / Leadership Skills"
        },
        "generic-skills__stakeholder-management": {
                "skill": "Generic Skills",
                "test": "Stakeholder Management",
                "label": "Generic Skills / Stakeholder Management"
        },
        "generic-skills__sales-cycle-development-solution-selling": {
                "skill": "Generic Skills",
                "test": "Sales Cycle Development / Solution Selling",
                "label": "Generic Skills / Sales Cycle Development / Solution Selling"
        },
        "basic-infra__active-directory-entra-id": {
                "skill": "Basic Infra",
                "test": "Active Directory / Entra ID",
                "label": "Basic Infra / Active Directory / Entra ID"
        },
        "basic-infra__networking": {
                "skill": "Basic Infra",
                "test": "Networking",
                "label": "Basic Infra / Networking"
        },
        "basic-infra__hyper-v": {
                "skill": "Basic Infra",
                "test": "Hyper-V",
                "label": "Basic Infra / Hyper-V"
        },
        "basic-infra__vmware-esxi": {
                "skill": "Basic Infra",
                "test": "VMWare ESXi",
                "label": "Basic Infra / VMWare ESXi"
        },
        "azure-infrastructure__infra-as-code": {
                "skill": "Azure Infrastructure",
                "test": "Infra as Code",
                "label": "Azure Infrastructure / Infra as Code"
        },
        "azure-infrastructure__devops-azure-devops": {
                "skill": "Azure Infrastructure",
                "test": "Devops (Azure Devops)",
                "label": "Azure Infrastructure / Devops (Azure Devops)"
        },
        "azure-infrastructure__cloud-adoption-framework": {
                "skill": "Azure Infrastructure",
                "test": "Cloud Adoption Framework",
                "label": "Azure Infrastructure / Cloud Adoption Framework"
        },
        "azure-infrastructure__well-architected-framework": {
                "skill": "Azure Infrastructure",
                "test": "Well Architected Framework",
                "label": "Azure Infrastructure / Well Architected Framework"
        },
        "azure-infrastructure__windows-sql-server-migration-to-azure": {
                "skill": "Azure Infrastructure",
                "test": "Windows & SQL Server Migration to Azure",
                "label": "Azure Infrastructure / Windows & SQL Server Migration to Azure"
        },
        "azure-infrastructure__azure-arc": {
                "skill": "Azure Infrastructure",
                "test": "Azure ARC",
                "label": "Azure Infrastructure / Azure ARC"
        },
        "azure-infrastructure__azure-logic-apps": {
                "skill": "Azure Infrastructure",
                "test": "Azure Logic Apps",
                "label": "Azure Infrastructure / Azure Logic Apps"
        },
        "azure-infrastructure__stack-hci-edge-iot": {
                "skill": "Azure Infrastructure",
                "test": "Stack HCI & Edge & IoT",
                "label": "Azure Infrastructure / Stack HCI & Edge & IoT"
        },
        "azure-infrastructure__azure-virtual-desktop": {
                "skill": "Azure Infrastructure",
                "test": "Azure Virtual Desktop",
                "label": "Azure Infrastructure / Azure Virtual Desktop"
        },
        "azure-infrastructure__citrix-cloud-on-azure": {
                "skill": "Azure Infrastructure",
                "test": "Citrix Cloud on Azure",
                "label": "Azure Infrastructure / Citrix Cloud on Azure"
        },
        "azure-infrastructure__vmware-horizon-cloud": {
                "skill": "Azure Infrastructure",
                "test": "VMware Horizon Cloud",
                "label": "Azure Infrastructure / VMware Horizon Cloud"
        },
        "azure-infrastructure__vmware-infrastructure-avs-migration": {
                "skill": "Azure Infrastructure",
                "test": "VMware Infrastructure (AVS) Migration",
                "label": "Azure Infrastructure / VMware Infrastructure (AVS) Migration"
        },
        "azure-infrastructure__business-continuity-disaster-recovery": {
                "skill": "Azure Infrastructure",
                "test": "Business Continuity & Disaster Recovery",
                "label": "Azure Infrastructure / Business Continuity & Disaster Recovery"
        },
        "azure-infrastructure__sap-on-azure": {
                "skill": "Azure Infrastructure",
                "test": "SAP on Azure",
                "label": "Azure Infrastructure / SAP on Azure"
        },
        "azure-infrastructure__high-performance-compute-ai-infra": {
                "skill": "Azure Infrastructure",
                "test": "High Performance Compute (AI Infra)",
                "label": "Azure Infrastructure / High Performance Compute (AI Infra)"
        },
        "azure-infrastructure__azure-backup": {
                "skill": "Azure Infrastructure",
                "test": "Azure Backup",
                "label": "Azure Infrastructure / Azure Backup"
        },
        "azure-infrastructure__filesync-storsimple-stg": {
                "skill": "Azure Infrastructure",
                "test": "FileSync/StorSimple/Stg",
                "label": "Azure Infrastructure / FileSync/StorSimple/Stg"
        },
        "azure-infrastructure__security-for-azure": {
                "skill": "Azure Infrastructure",
                "test": "Security for Azure",
                "label": "Azure Infrastructure / Security for Azure"
        },
        "azure-infrastructure__azure-disaster-recovery": {
                "skill": "Azure Infrastructure",
                "test": "Azure Disaster Recovery",
                "label": "Azure Infrastructure / Azure Disaster Recovery"
        },
        "azure-infrastructure__azure-kubernetes": {
                "skill": "Azure Infrastructure",
                "test": "Azure Kubernetes",
                "label": "Azure Infrastructure / Azure Kubernetes"
        },
        "azure-infrastructure__monitoracao-e-observabilidade": {
                "skill": "Azure Infrastructure",
                "test": "Monitoracao e Observabilidade",
                "label": "Azure Infrastructure / Monitoracao e Observabilidade"
        },
        "azure-infrastructure__oracle-replicacao": {
                "skill": "Azure Infrastructure",
                "test": "Oracle - replicacao",
                "label": "Azure Infrastructure / Oracle - replicacao"
        },
        "azure-infrastructure__sql-cluster-dr-e-ha": {
                "skill": "Azure Infrastructure",
                "test": "SQL CLuster, DR e HA",
                "label": "Azure Infrastructure / SQL CLuster, DR e HA"
        },
        "azure-infrastructure__terraform": {
                "skill": "Azure Infrastructure",
                "test": "Terraform",
                "label": "Azure Infrastructure / Terraform"
        },
        "azure-infrastructure__ci-cd": {
                "skill": "Azure Infrastructure",
                "test": "CI/CD",
                "label": "Azure Infrastructure / CI/CD"
        },
        "azure-infrastructure__ansible": {
                "skill": "Azure Infrastructure",
                "test": "Ansible",
                "label": "Azure Infrastructure / Ansible"
        },
        "modern-work__adds": {
                "skill": "Modern Work",
                "test": "ADDS",
                "label": "Modern Work / ADDS"
        },
        "modern-work__cybersec-foundation": {
                "skill": "Modern Work",
                "test": "CyberSec Foundation",
                "label": "Modern Work / CyberSec Foundation"
        },
        "modern-work__dlp": {
                "skill": "Modern Work",
                "test": "DLP",
                "label": "Modern Work / DLP"
        },
        "modern-work__microsoft-graph": {
                "skill": "Modern Work",
                "test": "Microsoft Graph",
                "label": "Modern Work / Microsoft Graph"
        },
        "modern-work__intune": {
                "skill": "Modern Work",
                "test": "Intune",
                "label": "Modern Work / Intune"
        },
        "modern-work__kql": {
                "skill": "Modern Work",
                "test": "KQL",
                "label": "Modern Work / KQL"
        },
        "modern-work__linux": {
                "skill": "Modern Work",
                "test": "Linux",
                "label": "Modern Work / Linux"
        },
        "modern-work__microsoft-defender-for-cloud-apps": {
                "skill": "Modern Work",
                "test": "Microsoft Defender for Cloud Apps",
                "label": "Modern Work / Microsoft Defender for Cloud Apps"
        },
        "modern-work__microsoft-defender-for-endpoint": {
                "skill": "Modern Work",
                "test": "Microsoft Defender for Endpoint",
                "label": "Modern Work / Microsoft Defender for Endpoint"
        },
        "modern-work__microsoft-defender-for-office-365": {
                "skill": "Modern Work",
                "test": "Microsoft Defender for Office 365",
                "label": "Modern Work / Microsoft Defender for Office 365"
        },
        "modern-work__mail-migration": {
                "skill": "Modern Work",
                "test": "Mail Migration",
                "label": "Modern Work / Mail Migration"
        },
        "modern-work__mip-purview": {
                "skill": "Modern Work",
                "test": "MIP / Purview",
                "label": "Modern Work / MIP / Purview"
        },
        "modern-work__network-foundation": {
                "skill": "Modern Work",
                "test": "Network Foundation",
                "label": "Modern Work / Network Foundation"
        },
        "modern-work__o365-foundation": {
                "skill": "Modern Work",
                "test": "O365 Foundation",
                "label": "Modern Work / O365 Foundation"
        },
        "modern-work__powershell": {
                "skill": "Modern Work",
                "test": "Powershell",
                "label": "Modern Work / Powershell"
        },
        "modern-work__canvas-apps": {
                "skill": "Modern Work",
                "test": "Canvas Apps",
                "label": "Modern Work / Canvas Apps"
        },
        "modern-work__model-driven-apps": {
                "skill": "Modern Work",
                "test": "Model Driven Apps",
                "label": "Modern Work / Model Driven Apps"
        },
        "modern-work__power-automate": {
                "skill": "Modern Work",
                "test": "Power Automate",
                "label": "Modern Work / Power Automate"
        },
        "modern-work__power-automate-desktop": {
                "skill": "Modern Work",
                "test": "Power Automate Desktop",
                "label": "Modern Work / Power Automate Desktop"
        },
        "modern-work__power-pages": {
                "skill": "Modern Work",
                "test": "Power Pages",
                "label": "Modern Work / Power Pages"
        },
        "modern-work__power-bi-setup-views": {
                "skill": "Modern Work",
                "test": "Power BI (setup & views)",
                "label": "Modern Work / Power BI (setup & views)"
        },
        "modern-work__power-bi-analitycs": {
                "skill": "Modern Work",
                "test": "Power BI (analitycs)",
                "label": "Modern Work / Power BI (analitycs)"
        },
        "modern-work__virtual-agents": {
                "skill": "Modern Work",
                "test": "Virtual Agents",
                "label": "Modern Work / Virtual Agents"
        },
        "modern-work__power-platform-admin-center": {
                "skill": "Modern Work",
                "test": "Power Platform Admin Center",
                "label": "Modern Work / Power Platform Admin Center"
        },
        "modern-work__dataverse": {
                "skill": "Modern Work",
                "test": "Dataverse",
                "label": "Modern Work / Dataverse"
        },
        "modern-work__sharepoint-online": {
                "skill": "Modern Work",
                "test": "SharePoint Online",
                "label": "Modern Work / SharePoint Online"
        },
        "modern-work__low-code-solution-packing": {
                "skill": "Modern Work",
                "test": "Low Code Solution Packing",
                "label": "Modern Work / Low Code Solution Packing"
        },
        "modern-work__ai-builder": {
                "skill": "Modern Work",
                "test": "AI Builder",
                "label": "Modern Work / AI Builder"
        },
        "modern-work__lotus-notes-development": {
                "skill": "Modern Work",
                "test": "Lotus Notes Development",
                "label": "Modern Work / Lotus Notes Development"
        },
        "modern-work__testing-qa": {
                "skill": "Modern Work",
                "test": "Testing & QA",
                "label": "Modern Work / Testing & QA"
        },
        "modern-work__use-case-mapping": {
                "skill": "Modern Work",
                "test": "Use Case Mapping",
                "label": "Modern Work / Use Case Mapping"
        },
        "modern-work__report-bug-fix": {
                "skill": "Modern Work",
                "test": "Report & Bug Fix",
                "label": "Modern Work / Report & Bug Fix"
        },
        "modern-work__people-science-insights": {
                "skill": "Modern Work",
                "test": "People Science Insights??",
                "label": "Modern Work / People Science Insights??"
        },
        "modern-work__employee-experience-advisory": {
                "skill": "Modern Work",
                "test": "Employee Experience Advisory",
                "label": "Modern Work / Employee Experience Advisory"
        },
        "modern-work__frontline-workers-deployment-and-solutions": {
                "skill": "Modern Work",
                "test": "Frontline Workers Deployment and Solutions",
                "label": "Modern Work / Frontline Workers Deployment and Solutions"
        },
        "modern-work__cloud-pc-endpoint": {
                "skill": "Modern Work",
                "test": "Cloud PC (Endpoint)",
                "label": "Modern Work / Cloud PC (Endpoint)"
        },
        "modern-work__cloud-endpoint-management": {
                "skill": "Modern Work",
                "test": "Cloud Endpoint Management",
                "label": "Modern Work / Cloud Endpoint Management"
        },
        "modern-work__microsoft-viva": {
                "skill": "Modern Work",
                "test": "Microsoft Viva",
                "label": "Modern Work / Microsoft Viva"
        },
        "modern-work__microsoft-entra-id": {
                "skill": "Modern Work",
                "test": "Microsoft Entra ID",
                "label": "Modern Work / Microsoft Entra ID"
        },
        "modern-work__microsoft-entra-id-avanced-solutions": {
                "skill": "Modern Work",
                "test": "Microsoft Entra ID - Avanced Solutions",
                "label": "Modern Work / Microsoft Entra ID - Avanced Solutions"
        },
        "modern-work__power-platform-governance": {
                "skill": "Modern Work",
                "test": "Power Platform Governance",
                "label": "Modern Work / Power Platform Governance"
        },
        "data-ai__appliance-migration-to-azure-synapse": {
                "skill": "Data & AI",
                "test": "Appliance Migration to Azure Synapse",
                "label": "Data & AI / Appliance Migration to Azure Synapse"
        },
        "data-ai__new-analytics-with-synapse-powerbi": {
                "skill": "Data & AI",
                "test": "New Analytics with Synapse & PowerBI",
                "label": "Data & AI / New Analytics with Synapse & PowerBI"
        },
        "data-ai__cloud-scale-analytics": {
                "skill": "Data & AI",
                "test": "Cloud Scale Analytics",
                "label": "Data & AI / Cloud Scale Analytics"
        },
        "data-ai__enable-unified-data-governance": {
                "skill": "Data & AI",
                "test": "Enable Unified Data Governance",
                "label": "Data & AI / Enable Unified Data Governance"
        },
        "data-ai__build-and-modernize-apps-with-containers-databases-and-ai": {
                "skill": "Data & AI",
                "test": "Build and modernize apps with containers, databases and AI",
                "label": "Data & AI / Build and modernize apps with containers, databases and AI"
        },
        "data-ai__desenhar-processos-de-ingest-o-transforma-o-e-consumo": {
                "skill": "Data & AI",
                "test": "Desenhar processos de ingestão , transformação e consumo",
                "label": "Data & AI / Desenhar processos de ingestão , transformação e consumo"
        },
        "data-ai__power-bi-analitycs": {
                "skill": "Data & AI",
                "test": "Power BI (analitycs)",
                "label": "Data & AI / Power BI (analitycs)"
        },
        "data-ai__python": {
                "skill": "Data & AI",
                "test": "Python",
                "label": "Data & AI / Python"
        },
        "data-ai__spark": {
                "skill": "Data & AI",
                "test": "Spark",
                "label": "Data & AI / Spark"
        },
        "digital-app-innovation__migrate-net-and-java-apps-to-app-service": {
                "skill": "Digital App Innovation",
                "test": "Migrate .NET and Java apps to App Service",
                "label": "Digital App Innovation / Migrate .NET and Java apps to App Service"
        },
        "digital-app-innovation__deploy-azure-integration-services-and-power-apps": {
                "skill": "Digital App Innovation",
                "test": "Deploy Azure integration services and Power Apps",
                "label": "Digital App Innovation / Deploy Azure integration services and Power Apps"
        },
        "digital-app-innovation__build-and-modernize-apps-with-containers-databases-and-ai": {
                "skill": "Digital App Innovation",
                "test": "Build and modernize apps with containers, databases and AI",
                "label": "Digital App Innovation / Build and modernize apps with containers, databases and AI"
        },
        "digital-app-innovation__rancher-e-openshift": {
                "skill": "Digital App Innovation",
                "test": "Rancher e Openshift",
                "label": "Digital App Innovation / Rancher e Openshift"
        },
        "digital-app-innovation__instrumentalizacao": {
                "skill": "Digital App Innovation",
                "test": "Instrumentalizacao",
                "label": "Digital App Innovation / Instrumentalizacao"
        },
        "security__data-security-discover-and-classify-data-prevent-data-loss-and-manage-insider-risk": {
                "skill": "Security",
                "test": "Data Security - Discover and Classify Data, Prevent Data Loss and Manage Insider Risk",
                "label": "Security / Data Security - Discover and Classify Data, Prevent Data Loss and Manage Insider Risk"
        },
        "security__data-governance-mitigate-compliance-risk": {
                "skill": "Security",
                "test": "Data Governance - Mitigate Compliance Risk",
                "label": "Security / Data Governance - Mitigate Compliance Risk"
        },
        "security__modern-soc-with-sentinel": {
                "skill": "Security",
                "test": "Modern SOC with Sentinel",
                "label": "Security / Modern SOC with Sentinel"
        },
        "security__threat-detection-with-xdr-siem": {
                "skill": "Security",
                "test": "Threat Detection with XDR & SIEM",
                "label": "Security / Threat Detection with XDR & SIEM"
        },
        "security__identity-and-access-management": {
                "skill": "Security",
                "test": "Identity and Access Management",
                "label": "Security / Identity and Access Management"
        },
        "security__microsoft-defender-for-cloud": {
                "skill": "Security",
                "test": "Microsoft Defender for Cloud",
                "label": "Security / Microsoft Defender for Cloud"
        },
        "security__waf": {
                "skill": "Security",
                "test": "WAF",
                "label": "Security / WAF"
        },
        "security__azure-key-vault": {
                "skill": "Security",
                "test": "Azure Key Vault",
                "label": "Security / Azure Key Vault"
        },
        "security__azure-monitor-logs": {
                "skill": "Security",
                "test": "Azure Monitor Logs",
                "label": "Security / Azure Monitor Logs"
        },
        "security__azure-storage-security": {
                "skill": "Security",
                "test": "Azure Storage Security",
                "label": "Security / Azure Storage Security"
        },
        "security__azure-database-security": {
                "skill": "Security",
                "test": "Azure Database Security",
                "label": "Security / Azure Database Security"
        },
        "security__microsoft-priva": {
                "skill": "Security",
                "test": "Microsoft Priva",
                "label": "Security / Microsoft Priva"
        },
        "managed-services__azure-lighthouse": {
                "skill": "Managed Services",
                "test": "Azure Lighthouse",
                "label": "Managed Services / Azure Lighthouse"
        },
        "managed-services__azure-monitor": {
                "skill": "Managed Services",
                "test": "Azure Monitor",
                "label": "Managed Services / Azure Monitor"
        },
        "managed-services__azure-insights": {
                "skill": "Managed Services",
                "test": "Azure Insights",
                "label": "Managed Services / Azure Insights"
        },
        "managed-services__azure-cost-management": {
                "skill": "Managed Services",
                "test": "Azure Cost Management",
                "label": "Managed Services / Azure Cost Management"
        },
        "managed-services__finops": {
                "skill": "Managed Services",
                "test": "Finops",
                "label": "Managed Services / Finops"
        },
        "managed-services__zabbix": {
                "skill": "Managed Services",
                "test": "Zabbix",
                "label": "Managed Services / Zabbix"
        },
        "managed-services__jira-service-management": {
                "skill": "Managed Services",
                "test": "Jira Service Management",
                "label": "Managed Services / Jira Service Management"
        },
        "certifications__certifications-msft-transcript-itil-etc-uploaded-into-sharepoint": {
                "skill": "Certifications",
                "test": "Certifications (MSFT Transcript, ITIL, etc) uploaded into sharepoint",
                "label": "Certifications / Certifications (MSFT Transcript, ITIL, etc) uploaded into sharepoint"
        }
};

      function getSkillDisplayName(value) {
        const item = SKILL_TEST_LOOKUP[String(value || "")];
        return item?.label || String(value || "");
      }

      const questionBank = {
        "language__portuguese-pt": [],
        "language__english-en": [],
        "language__spanish-es": [],
        "project-management__agile-scrum": [],
        "project-management__waterfall": [],
        "project-management__risk-management": [],
        "project-management__budget-management": [],
        "project-management__change-management": [],
        "project-management__documentation": [],
        "generic-skills__people-management": [],
        "generic-skills__leadership-skills": [],
        "generic-skills__stakeholder-management": [],
        "generic-skills__sales-cycle-development-solution-selling": [],
        "basic-infra__active-directory-entra-id": [],
        "basic-infra__networking": [],
        "basic-infra__hyper-v": [],
        "basic-infra__vmware-esxi": [],
        "azure-infrastructure__infra-as-code": [],
        "azure-infrastructure__devops-azure-devops": [],
        "azure-infrastructure__cloud-adoption-framework": [],
        "azure-infrastructure__well-architected-framework": [],
        "azure-infrastructure__windows-sql-server-migration-to-azure": [],
        "azure-infrastructure__azure-arc": [],
        "azure-infrastructure__azure-logic-apps": [],
        "azure-infrastructure__stack-hci-edge-iot": [],
        "azure-infrastructure__azure-virtual-desktop": [],
        "azure-infrastructure__citrix-cloud-on-azure": [],
        "azure-infrastructure__vmware-horizon-cloud": [],
        "azure-infrastructure__vmware-infrastructure-avs-migration": [],
        "azure-infrastructure__business-continuity-disaster-recovery": [],
        "azure-infrastructure__sap-on-azure": [],
        "azure-infrastructure__high-performance-compute-ai-infra": [],
        "azure-infrastructure__azure-backup": [],
        "azure-infrastructure__filesync-storsimple-stg": [],
        "azure-infrastructure__security-for-azure": [],
        "azure-infrastructure__azure-disaster-recovery": [],
        "azure-infrastructure__azure-kubernetes": [],
        "azure-infrastructure__monitoracao-e-observabilidade": [],
        "azure-infrastructure__oracle-replicacao": [],
        "azure-infrastructure__sql-cluster-dr-e-ha": [],
        "azure-infrastructure__terraform": [],
        "azure-infrastructure__ci-cd": [],
        "azure-infrastructure__ansible": [],
        "modern-work__adds": [],
        "modern-work__cybersec-foundation": [],
        "modern-work__dlp": [],
        "modern-work__microsoft-graph": [],
        "modern-work__intune": [],
        "modern-work__kql": [],
        "modern-work__linux": [],
        "modern-work__microsoft-defender-for-cloud-apps": [],
        "modern-work__microsoft-defender-for-endpoint": [],
        "modern-work__microsoft-defender-for-office-365": [],
        "modern-work__mail-migration": [],
        "modern-work__mip-purview": [],
        "modern-work__network-foundation": [],
        "modern-work__o365-foundation": [],
        "modern-work__powershell": [],
        "modern-work__canvas-apps": [],
        "modern-work__model-driven-apps": [],
        "modern-work__power-automate": [],
        "modern-work__power-automate-desktop": [],
        "modern-work__power-pages": [],
        "modern-work__power-bi-setup-views": [],
        "modern-work__power-bi-analitycs": [],
        "modern-work__virtual-agents": [],
        "modern-work__power-platform-admin-center": [],
        "modern-work__dataverse": [],
        "modern-work__sharepoint-online": [],
        "modern-work__low-code-solution-packing": [],
        "modern-work__ai-builder": [],
        "modern-work__lotus-notes-development": [],
        "modern-work__testing-qa": [],
        "modern-work__use-case-mapping": [],
        "modern-work__report-bug-fix": [],
        "modern-work__people-science-insights": [],
        "modern-work__employee-experience-advisory": [],
        "modern-work__frontline-workers-deployment-and-solutions": [],
        "modern-work__cloud-pc-endpoint": [],
        "modern-work__cloud-endpoint-management": [],
        "modern-work__microsoft-viva": [],
        "modern-work__microsoft-entra-id": [],
        "modern-work__microsoft-entra-id-avanced-solutions": [],
        "modern-work__power-platform-governance": [],
        "data-ai__appliance-migration-to-azure-synapse": [],
        "data-ai__new-analytics-with-synapse-powerbi": [],
        "data-ai__cloud-scale-analytics": [],
        "data-ai__enable-unified-data-governance": [],
        "data-ai__build-and-modernize-apps-with-containers-databases-and-ai": [],
        "data-ai__desenhar-processos-de-ingest-o-transforma-o-e-consumo": [],
        "data-ai__power-bi-analitycs": [],
        "data-ai__python": [],
        "data-ai__spark": [],
        "digital-app-innovation__migrate-net-and-java-apps-to-app-service": [],
        "digital-app-innovation__deploy-azure-integration-services-and-power-apps": [],
        "digital-app-innovation__build-and-modernize-apps-with-containers-databases-and-ai": [],
        "digital-app-innovation__rancher-e-openshift": [],
        "digital-app-innovation__instrumentalizacao": [],
        "security__data-security-discover-and-classify-data-prevent-data-loss-and-manage-insider-risk": [],
        "security__data-governance-mitigate-compliance-risk": [],
        "security__modern-soc-with-sentinel": [],
        "security__threat-detection-with-xdr-siem": [],
        "security__identity-and-access-management": [],
        "security__microsoft-defender-for-cloud": [],
        "security__waf": [],
        "security__azure-key-vault": [],
        "security__azure-monitor-logs": [],
        "security__azure-storage-security": [],
        "security__azure-database-security": [],
        "security__microsoft-priva": [],
        "managed-services__azure-lighthouse": [],
        "managed-services__azure-monitor": [],
        "managed-services__azure-insights": [],
        "managed-services__azure-cost-management": [],
        "managed-services__finops": [],
        "managed-services__zabbix": [],
        "managed-services__jira-service-management": [],
        "certifications__certifications-msft-transcript-itil-etc-uploaded-into-sharepoint": []
};

            // ====== Carregamento sob demanda por skill/teste, caso existam arquivos externos ======
            window.__QUESTION_BANK_FILES__ = window.__QUESTION_BANK_FILES__ || {};
            const __examLoaded = Object.create(null);
            const __examLoading = Object.create(null);

            function ensureExamLoaded(exam) {
              if (__examLoaded[exam]) return Promise.resolve();
              if (Array.isArray(questionBank[exam]) && questionBank[exam].length > 0) {
                __examLoaded[exam] = true;
                return Promise.resolve();
              }
              if (__examLoading[exam]) return __examLoading[exam];

              const src = encodeURI(`${exam}.js`);
              __examLoading[exam] = new Promise((resolve) => {
                const s = document.createElement("script");
                s.src = src;
                s.async = true;
                s.onload = () => {
                  const payload = window.__QUESTION_BANK_FILES__ && window.__QUESTION_BANK_FILES__[exam];
                  if (Array.isArray(payload)) questionBank[exam] = payload;
                  if (!Array.isArray(questionBank[exam])) questionBank[exam] = [];
                  __examLoaded[exam] = true;
                  resolve();
                };
                s.onerror = () => {
                  if (!Array.isArray(questionBank[exam])) questionBank[exam] = [];
                  __examLoaded[exam] = true;
                  resolve();
                };
                document.head.appendChild(s);
              });
              return __examLoading[exam];
            }


      function indexToOptionKey(index) {
        let n = Number(index) + 1;
        let out = "";
        while (n > 0) {
          n -= 1;
          out = String.fromCharCode(65 + (n % 26)) + out;
          n = Math.floor(n / 26);
        }
        return out;
      }

      function buildOptionKeys(count) {
        const total = Math.max(0, Number(count) || 0);
        return Array.from({ length: total }, (_, i) => indexToOptionKey(i));
      }

      const splashScreen = document.getElementById("splashScreen");
      const logoImg = document.getElementById("logoImg");

      const menuCard = document.getElementById("menuCard");
      const quizCard = document.getElementById("quizCard");
      const resultCard = document.getElementById("resultCard");

      const optExamName = document.getElementById("optExamName");
      const optPassPct = document.getElementById("optPassPct");
      const optShuffleQuestions = document.getElementById("optShuffleQuestions");
      const optShuffleAnswers = document.getElementById("optShuffleAnswers");
      const optShowFeedback = document.getElementById("optShowFeedback");
      const optShowCorrectOnWrong = document.getElementById("optShowCorrectOnWrong");
      const optEnableTimer = document.getElementById("optEnableTimer");
      const optTimerMinutes = document.getElementById("optTimerMinutes");
      const optSkillTimer = document.getElementById("optSkillTimer");
      const timerSwitchLabel = document.getElementById("timerSwitchLabel");
      const resetFiltersBtn = document.getElementById("resetFiltersBtn");
      const themeToggle = document.getElementById("themeToggle");
      const settingsMenu = document.getElementById("settingsMenu");
      const settingsTrigger = document.getElementById("settingsTrigger");
      const settingsDropdown = document.getElementById("settingsDropdown");
      const settingsUserName = document.getElementById("settingsUserName");
      const managePlanBtnMenu = document.getElementById("managePlanBtnMenu");
      const licenseBadgeText = document.getElementById("licenseBadgeText");
      const freeOfferPanel = document.getElementById("freeOfferPanel");
      const freeOfferRemaining = document.getElementById("freeOfferRemaining");
      const freePlanNotice = document.getElementById("freePlanNotice");
      const seePlansBtn = document.getElementById("seePlansBtn");
      const keepFreePlanBtn = document.getElementById("keepFreePlanBtn");

      const optTypeAll = document.getElementById("optTypeAll");
      const optTypeMcq = document.getElementById("optTypeMcq");
      const optTypeMatrix = document.getElementById("optTypeMatrix");
      const optTypeYesNo = document.getElementById("optTypeYesNo");
      const optTypeYesNoAlt = document.getElementById("optTypeYesNoAlt");
      const optTypeInline = document.getElementById("optTypeInline");
      const optTypeDrag = document.getElementById("optTypeDrag");
      const optTypeLaborio = document.getElementById("optTypeLaborio");
      const optTypeUnsupported = document.getElementById("optTypeUnsupported");
      const optQuestionRange = document.getElementById("optQuestionRange");

      const startBtn = document.getElementById("startBtn");

      const examInfo = document.getElementById("examInfo");
      const menuMsg = document.getElementById("menuMsg");

      const timerBar = document.getElementById("timerBar");
      const timerText = document.getElementById("timerText");
      const examPill = document.getElementById("examPill");

      const titleEl = document.getElementById("title");
      const qTitleExamEl = document.getElementById("qTitleExam");
      const qJumpSel = document.getElementById("qJump");
      const qTitleOfEl = document.getElementById("qTitleOf");
      const qPromptEl = document.getElementById("qPrompt");
      const imgEl = document.getElementById("qimg");
      const imgEl2 = document.getElementById("qimg2");
      const imgEl3 = document.getElementById("qimg3");
      const imgEl4 = document.getElementById("qimg4");
      const imgEl5 = document.getElementById("qimg5");
      const optsEl = document.getElementById("opts");
      const msgEl = document.getElementById("msg");

      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const finishBtn = document.getElementById("finishBtn");
      const restartBtn = document.getElementById("restartBtn");

      const resultTitleEl = document.getElementById("resultTitle");
      const scorePctEl = document.getElementById("scorePct");
      const scoreDetailEl = document.getElementById("scoreDetail");
      const passFailMsgEl = document.getElementById("passFailMsg");
      const wrongListWrap = document.getElementById("wrongListWrap");
      const wrongListEl = document.getElementById("wrongList");

      const continueBtn = document.getElementById("continueBtn");
      const retryWrongBtn = document.getElementById("retryWrongBtn");
      const retryAllBtn = document.getElementById("retryAllBtn");
      const backToMenuBtn = document.getElementById("backToMenuBtn");

      // Dropdown custom Skill
      const examDD = document.getElementById("examDD");
      const examDDButton = document.getElementById("examDDButton");
      const examDDLabel = document.getElementById("examDDLabel");
      const examDDMenu = document.getElementById("examDDMenu");
      const examDDGroups = examDDMenu.querySelectorAll(".examDD__group");
      const examDDItems = examDDMenu.querySelectorAll(".examDD__item");
      const optTime = document.getElementById("optTime");
      const levelDD = document.getElementById("levelDD");
      const levelDDBtn = document.getElementById("levelDDBtn");
      const levelDDLabel = document.getElementById("levelDDLabel");
      const levelChecks = Array.from(document.querySelectorAll(".levelCheck"));
      const scaleResultWrap = document.getElementById("scaleResultWrap");
      const freeLockFields = [
        document.getElementById("fieldQuestionTypes"),
        document.getElementById("fieldQuestionRange"),
        document.getElementById("fieldPassPct"),
        document.getElementById("fieldShuffleQuestions"),
        document.getElementById("fieldShuffleAnswers"),
        document.getElementById("fieldEnableTimer"),
        document.getElementById("fieldTimerMinutes")
      ];

      let accessProfile = null;
      let freeUsageInterval = null;
      let freeCountdownInterval = null;  // mantido para compat; gerenciado pelo novo sistema

      // ── Toast para recursos bloqueados no plano gratuito ─────────────────────
      let _toastTimer = null;
      const _toastEl = document.getElementById('freeLockedToast');

      function showFreeLockedToast(msg) {
        if (!_toastEl) return;
        _toastEl.textContent = msg || '🔒 Este recurso está disponível apenas nos planos pagos.';
        _toastEl.classList.add('visible');
        if (_toastTimer) clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => {
          _toastEl.classList.remove('visible');
        }, 3500);
      }

      // Detecta clique em qualquer área com .fieldLocked e exibe o toast
      document.addEventListener('click', (e) => {
        const locked = e.target.closest('.fieldLocked');
        if (!locked) return;
        e.preventDefault();
        e.stopPropagation();
        showFreeLockedToast();
      }, true);
      let freeCountdownRemaining = 0;    // variável de display; atualizada por freeLocalSeconds
      let freeCountdownDeadlineMs = 0;   // mantido para compat; não usado pelo novo sistema
      let currentLicenseUi = null;
      let freeLastKnownUsageDate = null;
      let accessUiRefreshInterval = null;
      let lastAccessProfileSyncKey = "";

      // ── Novo sistema de timer simplificado ────────────────────────────────────
      // freeLocalSeconds: contador que decrementa 1/s, independente de qualquer sync de perfil.
      // Só é inicializado UMA vez após o boot e atualizado pela resposta do servidor.
      let freeLocalSeconds   = null;  // null = ainda não inicializado
      let freeTimerRunning   = false; // evita múltiplas inicializações
      let freeTimerSyncDate  = null;  // última data de uso confirmada pelo servidor
      const FREE_TIMER_DEADLINE_KEY = 'free_timer_deadline';

      function readPersistedFreeTimerDeadline(userId = null) {
        try {
          const raw = localStorage.getItem(FREE_TIMER_DEADLINE_KEY);
          if (!raw) return null;
          const data = JSON.parse(raw);
          const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
          if (!data || data.usageDate !== today) return null;
          if (userId && data.userId && data.userId !== userId) return null;
          if (typeof data.deadlineMs !== 'number') return null;
          return data;
        } catch (_) {
          return null;
        }
      }

      function getPersistedFreeTimerRemainingSeconds(userId = null) {
        const persisted = readPersistedFreeTimerDeadline(userId);
        if (!persisted) return null;
        return Math.max(0, Math.ceil((persisted.deadlineMs - Date.now()) / 1000));
      }

      function persistLiveFreeRemaining(secondsOverride = null) {
        try {
          const profile = parseAccessProfile();
          if (String(profile?.licenseType || '').toLowerCase() !== 'free') return;

          const remaining = Math.max(0, Number(secondsOverride ?? freeLocalSeconds ?? profile.remainingSeconds ?? 0));
          const merged = {
            ...profile,
            remainingSeconds: remaining,
            dailyUsageDate: freeTimerSyncDate ?? profile.dailyUsageDate ?? profile.daily_usage_date ?? null,
            syncedAtMs: Date.now()
          };

          window.__ACCESS_PROFILE__ = merged;
          localStorage.setItem('access_profile', JSON.stringify(merged));
        } catch (_) {}
      }

      // Bloqueia o timer até __ACCESS_PROFILE_READY__ resolver (perfil confiável do banco)
      let accessProfileBootPending = true;

      // Pré-carregar deadline salvo para mostrar tempo correto mesmo durante o boot
      // (evita mostrar 00:00:00 ou 01:00:00 estático enquanto aguarda o banco)
      try {
        const _preDeadlineRaw = localStorage.getItem('free_timer_deadline');
        if (_preDeadlineRaw) {
          const _preDeadline = JSON.parse(_preDeadlineRaw);
          const _today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
          if (_preDeadline && _preDeadline.usageDate === _today &&
              typeof _preDeadline.deadlineMs === 'number' && _preDeadline.deadlineMs > Date.now()) {
            window.__freeTimerDeadlineMs__ = _preDeadline.deadlineMs;
          }
        }
      } catch (_) {}

      const TEAM_SKILL_MAP = {
        N1: [
          "managed-services__azure-insights",
          "managed-services__azure-monitor",
          "azure-infrastructure__monitoracao-e-observabilidade",
          "managed-services__zabbix",
          "azure-infrastructure__azure-backup",
          "modern-work__powershell"
        ],
        N2: [],
        N3: [],
        SAM: [],
        HAM: [],
        Finops: []
      };
      const SCALE_LEVELS = ["Foundational", "Intermediate", "Advanced", "Expert"];
      const LEVEL_SCORE_MAP = { Foundational: 100, Intermediate: 200, Advanced: 300, Expert: 400 };
      const TIMER_SECONDS_PER_QUESTION = 90;
      let selectedSkillIds = new Set();

      function getTeamImposedSkills(){
        const team = String(optTime?.value || "");
        return new Set(TEAM_SKILL_MAP[team] || []);
      }

      function getSelectedSkillIds(){
        return Array.from(selectedSkillIds);
      }

      function getSelectedLevelIds(){
        const selected = levelChecks.filter(ch => ch.checked).map(ch => ch.value);
        return selected;
      }

      function getSkillListLabel(ids){
        const labels = ids.map(id => getSkillDisplayName(id));
        if (labels.length === 0) return "Nenhuma skill selecionada";
        if (labels.length === 1) return labels[0];
        if (labels.length === 2) return labels.join(" + ");
        return `${labels.length} skills selecionadas`;
      }

      function syncLegacySkillSelect(){
        const first = getSelectedSkillIds()[0] || "";
        if (optExamName) optExamName.value = first;
      }

      function refreshSkillSelectionUi(){
        const ids = getSelectedSkillIds();
        examDDLabel.textContent = getSkillListLabel(ids);
        examDDItems.forEach(btn => {
          const id = btn.getAttribute("data-exam");
          btn.classList.toggle("is-selected", selectedSkillIds.has(id));
        });
        syncLegacySkillSelect();
      }

      function refreshLevelSelectionUi(){
        const levels = getSelectedLevelIds();
        if (levels.length === 0) levelDDLabel.textContent = "Nenhum nível selecionado";
        else if (levels.length === SCALE_LEVELS.length) levelDDLabel.textContent = "Todos os níveis";
        else levelDDLabel.textContent = levels.join(" + ");
      }

      function updateTimerSwitchUi(){
        const enabled = !!optSkillTimer?.checked;
        if (timerSwitchLabel) timerSwitchLabel.textContent = enabled ? "On" : "Off";
        if (optEnableTimer) optEnableTimer.checked = enabled;
      }

      function resetFilters(){
        if (optTime) optTime.value = "";
        selectedSkillIds = new Set();
        levelChecks.forEach(ch => { ch.checked = true; });
        if (optSkillTimer) optSkillTimer.checked = true;
        if (optQuestionRange) optQuestionRange.value = "";
        clearMsg(menuMsg);
        refreshSkillSelectionUi();
        refreshLevelSelectionUi();
        updateTimerSwitchUi();
        updateExamInfo();
      }

      function openExamDD(){ examDD.classList.add("open"); examDDButton.setAttribute("aria-expanded", "true"); }
      function closeExamDD(){
        examDD.classList.remove("open");
        examDDButton.setAttribute("aria-expanded", "false");
        examDDGroups.forEach(g => g.classList.remove("active"));
      }
      function toggleExamDD(){ examDD.classList.contains("open") ? closeExamDD() : openExamDD(); }

      function setExam(exam){
        if (!exam) return;
        const imposed = getTeamImposedSkills();
        if (selectedSkillIds.has(exam) && !imposed.has(exam)) selectedSkillIds.delete(exam);
        else selectedSkillIds.add(exam);
        refreshSkillSelectionUi();
        updateExamInfo();
      }

      function applyTimeSelection(){
        const team = String(optTime?.value || "");
        if (team && TEAM_SKILL_MAP[team]) {
          selectedSkillIds = new Set(TEAM_SKILL_MAP[team]);
        }
        refreshSkillSelectionUi();
        updateExamInfo();
      }

      function openLevelDD(){ levelDD.classList.add("open"); levelDDBtn.setAttribute("aria-expanded", "true"); }
      function closeLevelDD(){ levelDD.classList.remove("open"); levelDDBtn.setAttribute("aria-expanded", "false"); }
      function toggleLevelDD(){ levelDD.classList.contains("open") ? closeLevelDD() : openLevelDD(); }

      examDDButton.addEventListener("click", (e) => { e.stopPropagation(); toggleExamDD(); closeLevelDD(); });
      examDDGroups.forEach(g => {
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          examDDGroups.forEach(x => x.classList.remove("active"));
          g.classList.add("active");
        });
      });
      examDDItems.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const exam = btn.getAttribute("data-exam");
          setExam(exam);
        });
      });
      optTime?.addEventListener("change", applyTimeSelection);
      optSkillTimer?.addEventListener("change", () => { updateTimerSwitchUi(); updateExamInfo(); });
      resetFiltersBtn?.addEventListener("click", resetFilters);
      updateTimerSwitchUi();
      levelDDBtn?.addEventListener("click", (e) => { e.stopPropagation(); toggleLevelDD(); closeExamDD(); });
      levelChecks.forEach(ch => ch.addEventListener("change", () => { refreshLevelSelectionUi(); updateExamInfo(); }));
      levelDD?.addEventListener("click", (e) => e.stopPropagation());
      document.addEventListener("click", () => { closeExamDD(); closeLevelDD(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeExamDD(); });

      const THEME_KEY = "gocert-theme";

      function applyTheme(theme) {
        const isDark = theme === "dark";
        document.documentElement.classList.toggle("dark-theme", isDark);
        if (themeToggle) themeToggle.checked = isDark;
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      }

      applyTheme(localStorage.getItem(THEME_KEY) || "light");
      themeToggle?.addEventListener("change", (event) => {
        applyTheme(event.target.checked ? "dark" : "light");
      });

      let runSettings = {
        examName: "language__portuguese-pt",
        skillDisplayName: "Language / Portuguese (PT)",
        passThreshold: 70,
        shuffleQuestions: true,
        shuffleAnswers: true,
        showFeedback: false,
        showCorrectOnWrong: false,
        timerEnabled: true,
        timerSeconds: 0
      };

      let questionsRun = [];
      let idx = 0;
      const userAnswers = new Map();

      let timerInterval = null;
      let timerDeadlineMs = 0;
      let timedOut = false;
      const UNSUPPORTED_PLACEHOLDER_REGEX = /questão em formato não suportado por este app/i;
      let imageRenderToken = 0;

      function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }

      function getOrderedSelectedLevels(){
        const selected = (runSettings.selectedLevels && runSettings.selectedLevels.length)
          ? runSettings.selectedLevels
          : getSelectedLevelIds();
        const selectedSet = new Set(selected);
        return SCALE_LEVELS.filter(level => selectedSet.has(level));
      }

      function orderQuestionsBySelectedLevel(sourceQuestions){
        const orderedLevels = getOrderedSelectedLevels();
        const levelSet = new Set(orderedLevels);
        const ordered = [];

        orderedLevels.forEach(level => {
          const levelQuestions = sourceQuestions.filter(q => String(q.level || "Foundational") === level);
          ordered.push(...shuffle(levelQuestions));
        });

        const withoutKnownLevel = sourceQuestions.filter(q => !levelSet.has(String(q.level || "Foundational")));
        if (withoutKnownLevel.length) ordered.push(...shuffle(withoutKnownLevel));

        return ordered;
      }
      function show(el){ el.classList.remove("hidden"); }
      function hide(el){ el.classList.add("hidden"); }

      function setMsg(el, text, kind) {
        el.textContent = text;
        el.classList.remove("hidden", "ok", "bad", "warn");
        el.classList.add(kind);
      }
      function clearMsg(el){
        el.textContent = "";
        el.classList.add("hidden");
        el.classList.remove("ok", "bad", "warn");
      }


      function parseAccessProfile() {
        try {
          const raw = localStorage.getItem("access_profile");
          const profile = raw ? JSON.parse(raw) : (window.__ACCESS_PROFILE__ || null);
          if (!profile) return null;

          const normalized = { ...profile };
          normalized.licenseType = String(
            normalized.licenseType ||
            normalized.license_type ||
            "paid"
          ).toLowerCase();

          if (normalized.licenseType === "free") {
            normalized.freeExpiresAt =
              normalized.freeExpiresAt ||
              normalized.free_expires_at ||
              null;

            let normalizedRemaining;
            if (normalized.freeExpiresAt) {
              normalizedRemaining = Math.max(
                0,
                Math.ceil((new Date(normalized.freeExpiresAt).getTime() - Date.now()) / 1000)
              );
            } else {
              normalizedRemaining = Math.max(
                0,
                Number(normalized.remainingSeconds ?? normalized.dailyLimitSeconds ?? 0)
              );
            }

            const deadlineRemaining = getPersistedFreeTimerRemainingSeconds(normalized.userId ?? null);
            if (deadlineRemaining !== null) {
              normalizedRemaining = Math.min(normalizedRemaining, deadlineRemaining);
            }

            normalized.remainingSeconds = normalizedRemaining;
          }

          return normalized;
        } catch {
          return window.__ACCESS_PROFILE__ || null;
        }
      }

      function formatRemainingLabel(totalSeconds) {
        const seconds = Math.max(0, Number(totalSeconds || 0));
        const hh = Math.floor(seconds / 3600);
        const mm = Math.floor((seconds % 3600) / 60);
        const ss = seconds % 60;
        if (hh > 0) return `${hh}h ${String(mm).padStart(2, "0")}m`;
        if (mm > 0) return `${mm}m`;
        return `${ss}s`;
      }

      function formatRemainingClock(totalSeconds) {
        const safeSeconds = Math.max(0, Number(totalSeconds || 0));
        const hh = Math.floor(safeSeconds / 3600);
        const mm = Math.floor((safeSeconds % 3600) / 60);
        const ss = safeSeconds % 60;
        return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
      }

      function updateFreeCountdownDisplay() {
        if (!freeOfferRemaining) return;
        let seconds;
        if (freeLocalSeconds !== null) {
          seconds = freeLocalSeconds;
        } else if (window.__freeTimerDeadlineMs__) {
          // Durante o boot: estimar a partir do deadline já salvo
          seconds = Math.max(0, Math.ceil((window.__freeTimerDeadlineMs__ - Date.now()) / 1000));
        } else {
          seconds = freeCountdownRemaining;
        }
        freeOfferRemaining.textContent = formatRemainingClock(seconds);
      }

      function getAccessProfileSyncKey(profile) {
        if (!profile) return "no-profile";

        return JSON.stringify({
          userId: profile.userId ?? null,
          licenseType: String(profile.licenseType || profile.license_type || "").toLowerCase(),
          dailyLimitSeconds: Number(profile.dailyLimitSeconds ?? profile.daily_limit_seconds ?? 0),
          dailyUsedSeconds: Number(profile.dailyUsedSeconds ?? profile.daily_used_seconds ?? 0),
          dailyUsageDate: profile.dailyUsageDate ?? profile.daily_usage_date ?? null,
          freeExpiresAt: profile.freeExpiresAt ?? profile.free_expires_at ?? null,
          updatedAt: profile.updatedAt ?? profile.updated_at ?? null
        });
      }

      // ── Data de hoje no fuso de Brasília (mesmo formato do app-access.js) ─────
      function _getTodayBrasilia() {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
      }

      // ── Lê segundos restantes do perfil com normalização de data ────────────
      // Replica a mesma lógica de app-access.js: se dailyUsageDate != hoje,
      // considera o dia como resetado e retorna o limite completo.
      // Isso evita que dados stale do dia anterior (remainingSeconds=0) travem o timer.
      function _getFreeSecondsFromProfile(profile) {
        const expiresAt = profile?.freeExpiresAt || profile?.free_expires_at || null;
        if (expiresAt) {
          const ms = new Date(expiresAt).getTime();
          if (Number.isFinite(ms)) return Math.max(0, Math.ceil((ms - Date.now()) / 1000));
        }

        const limit = Math.max(0, Number(
          profile?.dailyLimitSeconds ?? profile?.daily_limit_seconds ?? 3600
        ));
        const usageDate = profile?.dailyUsageDate ?? profile?.daily_usage_date ?? null;
        const today     = _getTodayBrasilia();

        // Se o registro é de outro dia, o saldo é resetado para o limite completo
        if (usageDate && usageDate !== today) {
          return limit;
        }

        const used = Math.max(0, Number(
          profile?.dailyUsedSeconds ?? profile?.daily_used_seconds ?? 0
        ));

        // Se remainingSeconds está disponível e é do dia atual, usa ele
        // Se não, recalcula a partir de limit - used
        const stored = Number(profile?.remainingSeconds ?? -1);
        if (stored >= 0 && usageDate === today) {
          return Math.max(0, Math.min(stored, limit - used));
        }

        return Math.max(0, limit - used);
      }

      // ── Chave do deadline persistido no localStorage ────────────────────────

      function _saveTimerDeadline(deadlineMs) {
        try {
          const profile = parseAccessProfile();
          const userId = profile?.userId ?? null;
          localStorage.setItem(FREE_TIMER_DEADLINE_KEY, JSON.stringify({
            deadlineMs,
            usageDate: freeTimerSyncDate ?? _getTodayBrasilia(),
            userId
          }));
        } catch (_) {}
      }

      function _loadTimerDeadline(userId) {
        try {
          const raw = localStorage.getItem(FREE_TIMER_DEADLINE_KEY);
          if (!raw) return null;
          const d = JSON.parse(raw);
          const today = _getTodayBrasilia();
          // Deadline só é válido se for do mesmo dia e do mesmo usuário
          if (!d || d.usageDate !== today) return null;
          if (d.userId && userId && d.userId !== userId) return null;
          if (typeof d.deadlineMs !== 'number' || d.deadlineMs < Date.now()) return null;
          return d.deadlineMs;
        } catch (_) { return null; }
      }

      function _clearTimerDeadline() {
        try { localStorage.removeItem(FREE_TIMER_DEADLINE_KEY); } catch (_) {}
      }

      // ── Inicializa o timer UMA vez, após o boot (perfil confiável do banco) ──
      function startFreeTimerOnce() {
        if (freeTimerRunning) return;  // já está rodando, não reinicializa

        const profile = parseAccessProfile();
        const isFree = String(profile?.licenseType || "").toLowerCase() === "free";
        if (!isFree) return;

        const profileSeconds = _getFreeSecondsFromProfile(profile);
        const userId = profile?.userId ?? null;
        freeTimerSyncDate = profile?.dailyUsageDate ?? null;

        // Tentar recuperar o deadline salvo de antes da última navegação.
        // O deadline é um timestamp absoluto — imune a recargas e diferenças de DB.
        const savedDeadline = _loadTimerDeadline(userId);

        let deadlineMs;
        if (savedDeadline !== null) {
          // Usa o deadline salvo diretamente — é um timestamp absoluto, imune a recargas.
          // O servidor vai REDUZIR o deadline na próxima sync (onFreeServerSync)
          // caso outro dispositivo tenha consumido tempo. Nunca reseta no reload.
          deadlineMs = savedDeadline;
        } else {
          // Sem deadline salvo (primeiro acesso, novo dispositivo ou novo dia):
          // inicializa a partir do tempo restante indicado pelo banco.
          deadlineMs = Date.now() + profileSeconds * 1000;
        }

        freeLocalSeconds   = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
        freeTimerRunning   = true;
        window.__freeTimerDeadlineMs__ = deadlineMs;

        _saveTimerDeadline(deadlineMs);

        freeCountdownRemaining = freeLocalSeconds;
        updateFreeCountdownDisplay();
        persistLiveFreeRemaining(freeLocalSeconds);

        setInterval(_freeTimerTick, 1000);
      }

      // ── Tick: calcula segundos restantes a partir do deadline absoluto ─────
      function _freeTimerTick() {
        if (accessProfileBootPending) return;  // aguarda boot
        if (!freeTimerRunning || !window.__freeTimerDeadlineMs__) return;

        // Usa deadline absoluto — não depende de decrementos acumulados
        freeLocalSeconds = Math.max(0, Math.ceil((window.__freeTimerDeadlineMs__ - Date.now()) / 1000));

        freeCountdownRemaining = freeLocalSeconds;
        updateFreeCountdownDisplay();
        persistLiveFreeRemaining(freeLocalSeconds);

        if (freeLocalSeconds <= 0) {
          _clearTimerDeadline();
          freeTimerRunning = false;
          lockAppForFreeExpiration();
          window.location.replace("/billing.html?reason=daily_limit");
        }
      }

      // ── Atualiza timer com dados do servidor (consumeFreeUsage) ──────────────
      // O servidor pode REDUZIR o deadline (consumo confirmado) ou RESETAR na virada do dia.
      function onFreeServerSync(serverSeconds, serverDate) {
        const isNewDay = serverDate && serverDate !== freeTimerSyncDate && freeTimerSyncDate !== null;
        if (serverDate) freeTimerSyncDate = serverDate;

        const serverDeadline = Date.now() + serverSeconds * 1000;

        if (isNewDay) {
          // Virada de dia — reseta deadline para o saldo do novo dia
          window.__freeTimerDeadlineMs__ = serverDeadline;
          _clearTimerDeadline();
          _saveTimerDeadline(serverDeadline);
          if (!freeTimerRunning) {
            freeTimerRunning = true;
            setInterval(_freeTimerTick, 1000);
          }
        } else if (!window.__freeTimerDeadlineMs__) {
          // Timer não inicializado — usa o valor do servidor
          window.__freeTimerDeadlineMs__ = serverDeadline;
          _saveTimerDeadline(serverDeadline);
        } else {
          // Mesmo dia — servidor só pode REDUZIR o deadline, nunca aumentar
          if (serverDeadline < window.__freeTimerDeadlineMs__) {
            window.__freeTimerDeadlineMs__ = serverDeadline;
            _saveTimerDeadline(serverDeadline);
          }
        }

        if (window.__freeTimerDeadlineMs__) {
          freeLocalSeconds = Math.max(0, Math.ceil((window.__freeTimerDeadlineMs__ - Date.now()) / 1000));
          freeCountdownRemaining = freeLocalSeconds;
          updateFreeCountdownDisplay();
          persistLiveFreeRemaining(freeLocalSeconds);
        }
      }

      // ── Stub de compat — não faz mais nada crítico ───────────────────────────
      function syncFreeCountdownFromProfile() {
        updateFreeCountdownDisplay();
      }

      // Stub mantido para compat — timer agora gerenciado por startFreeTimerOnce/_freeTimerTick
      function startLocalFreeCountdown(forceResync = false) {
        updateFreeCountdownDisplay();
      }

      async function hydrateCurrentUserInfo() {
        try {
          const api = window.__appSupabase;
          const { data: { session } } = await api.auth.getSession();
          const user = session?.user || null;
          const fallbackName = user?.email ? String(user.email).split("@")[0] : "Usuário";
          const displayName =
            user?.user_metadata?.name ||
            user?.user_metadata?.full_name ||
            user?.user_metadata?.display_name ||
            user?.user_metadata?.preferred_username ||
            fallbackName;

          if (settingsUserName) {
            settingsUserName.textContent = displayName || "Usuário";
          }
        } catch {
          if (settingsUserName) settingsUserName.textContent = "Usuário";
        }
      }

      function setSettingsMenuOpen(open) {
        if (!settingsDropdown || !settingsTrigger || !settingsMenu) return;
        settingsDropdown.classList.toggle("hidden", !open);
        settingsTrigger.setAttribute("aria-expanded", open ? "true" : "false");
        settingsMenu.classList.toggle("open", open);
      }

      function toggleSettingsMenu() {
        const isClosed = settingsDropdown?.classList.contains("hidden");
        setSettingsMenuOpen(!!isClosed);
      }

      function openBillingPage() {
        window.location.href = "/billing.html";
      }

      function lockAppForFreeExpiration() {
        [
          optExamName, examDDButton, optTypeAll, optTypeMcq, optTypeMatrix, optTypeYesNo, optTypeYesNoAlt,
          optTypeInline, optTypeDrag, optTypeLaborio, optTypeUnsupported, optQuestionRange,
          optPassPct, optShuffleQuestions, optShuffleAnswers, optShowFeedback,
          optShowCorrectOnWrong, optEnableTimer, optTimerMinutes, startBtn
        ].forEach((field) => {
          if (field) field.disabled = true;
        });

        if (menuMsg) {
          setMsg(
            menuMsg,
            "Tempo máximo de uso diário da licença gratuita esgotado. Adquira um novo plano para continuar.",
            "warn"
          );
        }
      }

      function applyAccessUi() {
        accessProfile = parseAccessProfile();

        if (accessProfileBootPending && !accessProfile) {
          updateFreeCountdownDisplay();
          return;
        }

        const licenseType = String(accessProfile?.licenseType || "paid").toLowerCase();
        const isFree = licenseType === "free";
        const badgeMap = {
          free: "Plano atual: Gratuito",
          paid: "Plano atual: Assinatura paga",
          adm: "Plano atual: ADM"
        };
        if (licenseBadgeText) {
          licenseBadgeText.textContent = badgeMap[licenseType] || "Plano ativo";
        }

        if (freeOfferPanel) {
          freeOfferPanel.classList.toggle("hidden", !isFree);
        }

        if (isFree) {
          // Timer gerenciado por startFreeTimerOnce — não chamar aqui para não interferir
          updateFreeCountdownDisplay();
        } else {
          // Conta não é mais gratuita — para o timer e limpa deadline
          freeTimerRunning = false;
          freeLocalSeconds = null;
          freeCountdownRemaining = 0;
          freeCountdownDeadlineMs = 0;
          window.__freeTimerDeadlineMs__ = null;
          _clearTimerDeadline();
          updateFreeCountdownDisplay();
          if (freeUsageInterval) {
            clearInterval(freeUsageInterval);
            freeUsageInterval = null;
          }
          if (freeCountdownInterval) {
            clearInterval(freeCountdownInterval);
            freeCountdownInterval = null;
          }
        }

        freeLockFields.forEach((el) => {
          if (!el) return;
          el.classList.toggle("fieldLocked", isFree);
        });

        if (isFree) {
          optTypeAll.checked = true;
          optTypeMcq.checked = true;
          optTypeMatrix.checked = true;
          optTypeYesNo.checked = true;
          optTypeYesNoAlt.checked = true;
          optTypeInline.checked = true;
          optTypeDrag.checked = true;
          optTypeLaborio.checked = true;
          optTypeUnsupported.checked = true;

          optPassPct.value = "70";
          optShuffleAnswers.checked = false;
          optShuffleQuestions.checked = false;
          optEnableTimer.checked = false;

          [
            optTypeAll,
            optTypeMcq,
            optTypeMatrix,
            optTypeYesNo,
            optTypeYesNoAlt,
            optTypeInline,
            optTypeDrag,
            optTypeLaborio,
            optTypeUnsupported,
            optQuestionRange,
            optPassPct,
            optShuffleAnswers,
            optShuffleQuestions,
            optEnableTimer,
            optTimerMinutes
          ].forEach((field) => {
            if (field) {
              field.disabled = true;
              field.classList.add("softLocked");
            }
          });

          [
            optShowFeedback,
            optShowCorrectOnWrong
          ].forEach((field) => {
            if (field) {
              field.disabled = false;
              field.classList.remove("softLocked");
            }
          });
        } else {
          [
            optTypeAll,
            optTypeMcq,
            optTypeMatrix,
            optTypeYesNo,
            optTypeYesNoAlt,
            optTypeInline,
            optTypeDrag,
            optTypeLaborio,
            optTypeUnsupported,
            optQuestionRange,
            optPassPct,
            optShuffleQuestions,
            optShuffleAnswers,
            optShowFeedback,
            optShowCorrectOnWrong,
            optEnableTimer,
            optTimerMinutes
          ].forEach((field) => {
            if (field) {
              field.disabled = false;
              field.classList.remove("softLocked");
            }
          });
        }

        updateTypeLabel();
        updateDependencies();
      }

      function refreshAccessUiState(force = false) {
        const profile = parseAccessProfile();

        if (accessProfileBootPending && !profile) {
          updateFreeCountdownDisplay();
          return;
        }

        const licenseType = String(profile?.licenseType || "paid").toLowerCase();
        const currentSyncKey = getAccessProfileSyncKey(profile);
        const profileChanged = currentSyncKey !== lastAccessProfileSyncKey;

        if (force || licenseType !== currentLicenseUi || profileChanged) {
          currentLicenseUi = licenseType;
          lastAccessProfileSyncKey = currentSyncKey;
          applyAccessUi();

          if (licenseType === "free") {
            startFreeUsageTracking();
          }
          return;
        }

        if (licenseType === "free") {
          updateFreeCountdownDisplay();
        }
      }

      async function consumeFreeUsage(seconds = 60) {
        accessProfile = parseAccessProfile();
        const licenseType = String(accessProfile?.licenseType || "").toLowerCase();
        if (licenseType !== "free") return;

        try {
          const api = window.__appSupabase;
          const { data: { session } } = await api.auth.getSession();
          if (!session?.access_token) return;

          const resp = await fetch("/api/free-usage-consume", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`
            },
            body: JSON.stringify({ seconds })
          });

          const payload = await resp.json().catch(() => ({}));
          if (!resp.ok) {
            console.warn("Falha ao consumir uso gratuito:", payload?.error || resp.statusText);
            return;
          }

          accessProfile = {
            ...(accessProfile || {}),
            licenseType: "free",
            dailyLimitSeconds: payload.dailyLimitSeconds,
            dailyUsedSeconds: payload.dailyUsedSeconds,
            remainingSeconds: payload.remainingSeconds,
            dailyUsageDate: payload.dailyUsageDate,
            freeExpiresAt: payload.freeExpiresAt || null
          };

          localStorage.setItem("access_profile", JSON.stringify(accessProfile));
          window.__ACCESS_PROFILE__ = accessProfile;
          window.dispatchEvent(new CustomEvent("access-profile-updated", { detail: accessProfile }));

          // Sincroniza o timer local com a resposta do servidor
          onFreeServerSync(
            Math.max(0, Number(payload.remainingSeconds ?? 0)),
            payload.dailyUsageDate ?? null
          );

          if (payload.exhausted) {
            lockAppForFreeExpiration();
            window.location.replace("/billing.html?reason=daily_limit");
          }
        } catch (err) {
          console.warn("Erro ao consumir tempo do plano gratuito:", err);
        }
      }

      function startFreeUsageTracking() {
        if (freeUsageInterval) {
          clearInterval(freeUsageInterval);
          freeUsageInterval = null;
        }
        if (freeCountdownInterval) {
          clearInterval(freeCountdownInterval);
          freeCountdownInterval = null;
        }

        accessProfile = parseAccessProfile();
        const isFree = String(accessProfile?.licenseType || "").toLowerCase() === "free";
        if (!isFree) return;

        applyAccessUi();
        // Não inicializar o timer aqui — startFreeTimerOnce cuida disso após o boot.
        // startFreeUsageTracking só é responsável pelo intervalo de consumo no servidor.

        freeUsageInterval = setInterval(() => {
          consumeFreeUsage(60);
        }, 60000);
      }

      function updateDependencies() {
        const profile = parseAccessProfile();
        const isFree = String(profile?.licenseType || "").toLowerCase() === "free";

        if (isFree) {
          optShuffleQuestions.disabled = true;
          optEnableTimer.disabled = true;
          optTimerMinutes.disabled = true;
          optShuffleQuestions.classList.add("softLocked");
          optEnableTimer.classList.add("softLocked");
          optTimerMinutes.classList.add("softLocked");

          optShowCorrectOnWrong.disabled = false;
          optShowCorrectOnWrong.classList.remove("softLocked");
          return;
        }

        if (!optShowFeedback.checked) {
          optShowCorrectOnWrong.checked = false;
          optShowCorrectOnWrong.disabled = true;
          optShowCorrectOnWrong.classList.add("softLocked");
        } else {
          optShowCorrectOnWrong.disabled = false;
          optShowCorrectOnWrong.classList.remove("softLocked");
        }

        optTimerMinutes.disabled = !optEnableTimer.checked;
        optTimerMinutes.classList.toggle("softLocked", optTimerMinutes.disabled);
        optShuffleQuestions.classList.remove("softLocked");
        optEnableTimer.classList.remove("softLocked");
      }

      function refreshQuestionJumpOptions() {
        if (!qJumpSel) return;
        const prev = String(idx);

        qJumpSel.innerHTML = "";
        questionsRun.forEach((qRun, i) => {
          const opt = document.createElement("option");
          const ans = userAnswers.get(qRun.id);
          const answered = isQuestionAnswered(qRun, ans);
          opt.value = String(i);
          opt.textContent = `${i + 1}${answered ? " ✓" : ""}`;
          qJumpSel.appendChild(opt);
        });

        qJumpSel.disabled = questionsRun.length === 0;
        if (questionsRun.length > 0) qJumpSel.value = prev;
      }

      function jumpToQuestionFromSelect() {
        if (timedOut) return;
        const v = parseInt(qJumpSel.value, 10);
        if (!Number.isFinite(v)) return;
        if (v < 0 || v >= questionsRun.length) return;
        idx = v;
        render();
      }

      async function logoutUser() {
        const api = window.__appSupabase;

        try {
          if (api?.auth?.signOut) {
            await api.auth.signOut();
          }
        } catch (err) {
          console.error("Erro ao deslogar:", err);
        } finally {
          localStorage.removeItem("app_session_token");
          window.location.replace("/auth.html?mode=login");
        }
      }

      function gotoMenu(){ stopTimer(); hide(quizCard); hide(resultCard); hide(scaleResultWrap); show(menuCard); }
      function gotoQuiz(){ hide(menuCard); hide(resultCard); show(quizCard); }
      function gotoResult(){ stopTimer(); hide(menuCard); hide(quizCard); show(resultCard); }

      function enterApp(){ splashScreen.style.display = "none"; gotoMenu(); }
      setTimeout(enterApp, 4000);

      if (logoImg) {
        logoImg.textContent = "SkillHub";
      }

      function formatMMSS(seconds) {
        const s = Math.max(0, Math.floor(seconds));
        const hh = Math.floor(s / 3600);
        const mm = Math.floor((s % 3600) / 60);
        const ss = s % 60;
        if (hh > 0) {
          return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
        }
        return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
      }

      function startTimerIfEnabled() {
        timedOut = false;
        if (!runSettings.timerEnabled) { hide(timerBar); return; }
        show(timerBar);
        timerDeadlineMs = Date.now() + runSettings.timerSeconds * 1000;
        tickTimer();
        timerInterval = setInterval(tickTimer, 250);
      }

      function stopTimer() {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
      }

      function tickTimer() {
        const remainingSec = Math.ceil((timerDeadlineMs - Date.now()) / 1000);
        timerText.textContent = formatMMSS(remainingSec);
        if (remainingSec <= 0) {
          timedOut = true;
          stopTimer();
          showResults(true);
        }
      }

      function isMulti(qRun) {
        return Array.isArray(qRun.correctValuesFixed) && qRun.correctValuesFixed.length > 1;
      }

      function evaluateIsCorrect(qRun, chosenKeys) {
        const chosenValues = chosenKeys.map(k => qRun.mappingFixed[k]);
        const correctValues = qRun.correctValuesFixed;

        if (chosenValues.length !== correctValues.length) return false;

        const a = new Set(chosenValues);
        const b = new Set(correctValues);

        if (a.size !== b.size) return false;
        for (const v of a) if (!b.has(v)) return false;
        return true;
      }


function isDropdownQuestion(qRun) {
  return !!qRun && qRun.type === "dropdownMatrix";
}






function isInlineDropdownQuestion(qRun) {
  return !!qRun && qRun.type === "inlineDropdown";
}

function cloneInlineValues(v) {
  const out = {};
  if (!v || typeof v !== "object") return out;
  Object.keys(v).forEach(k => { out[k] = v[k]; });
  return out;
}

function getInlineRequiredCount(qRun) {
  if (!isInlineDropdownQuestion(qRun)) return 0;
  return Object.keys(qRun.inline?.slots || {}).length;
}

function getFilledInlineCount(qRun, inlineValues) {
  if (!isInlineDropdownQuestion(qRun)) return 0;
  let c = 0;
  const slots = qRun.inline?.slots || {};
  Object.keys(slots).forEach(k => {
    const v = inlineValues?.[k];
    if (typeof v === "string" && v.trim() !== "") c++;
  });
  return c;
}

function evaluateInlineIsCorrect(qRun, inlineValues) {
  if (!isInlineDropdownQuestion(qRun)) return false;
  const slots = qRun.inline?.slots || {};
  for (const k of Object.keys(slots)) {
    const expected = slots[k]?.correct;
    const actual = inlineValues?.[k] || "";
    if (!expected || actual !== expected) return false;
  }
  return true;
}

// Classificação (para filtro no menu)
const LABORIO_QUESTION_IDS = new Set([
  "az500-q33",
  "az500-q107",
  "az500-q112",
  "az500-q124",
  "az500-q131",
  "az500-q141",
  "az500-q168",
  "az500-q304",
  "az500-q324",
  "az500-q327",
  "az500-q366",
  "az500-q396",
  "az500-q406",
  "az500-q454",
  "az500-q459",
  "az500-q462",
  "az500-q484",
  "ms700-q21",
  "ms700-q22",
  "ms700-q23",
  "ms700-q24",
  "ms700-q25",
  "ms700-q26",
  "ms700-q27",
  "ms700-q28",
  "ms700-q30",
  "ms700-q31",
  "ms700-q32",
  "ms700-q36",
  "ms700-q38",
  "ms700-q39",
  "ms700-q40",
  "ms700-q43",
  "ms700-q44",
  "ms700-q47",
  "ms700-q48",
  "ms700-q49",
  "ms700-q51",
  "ms700-q52",
  "ms700-q53",
  "ms700-q54",
]);

const YESNO_QUESTION_IDS = new Set([
  "az500-q30",
  "az500-q39",
  "az500-q40",
  "az500-q56",
  "az500-q59",
  "az500-q61",
  "az500-q80",
  "az500-q81",
  "az500-q98",
  "az500-q101",
  "az500-q110",
  "az500-q117",
  "az500-q153",
  "az500-q177",
  "az500-q186",
  "az500-q207",
  "az500-q236",
  "az500-q244",
  "az500-q267",
  "az500-q300",
  "az500-q307",
  "az500-q410",
  "az500-q439",
  "az500-q442",
  "az500-q482",
  "az500-q492",
  "ms700-q67",
  "ms700-q91",
  "ms700-q93",
  "ms700-q111",
  "ms700-q123",
  "ms700-q131",
  "ms700-q136",
  "ms700-q168",
  "ms700-q169",
  "ms700-q172",
  "ms700-q191",
  "ms700-q207",
  "ms700-q209",
  "ms700-q210",
  "ms700-q213",
  "ms700-q228",
  "ms700-q234",
  "ms700-q236",
  "ms700-q237",
  "ms700-q241",
  "ms700-q247",
  "ms700-q265",
  "ms700-q283",
  "ms700-q299",
  "ms700-q302",
  "ms700-q306",
  "ms700-q312",
  "ms700-q322",
  "ms700-q329",
  "ms700-q332",
  "ms700-q335",
  "ms700-q337",
  "ms700-q367",
  "ms700-q370",
  "ms700-q382",
  "ms700-q385",
  "ms700-q390",
  "ms700-q402",
]);

const INLINE_QUESTION_IDS = new Set([
]);

const MATRIX_ONLY_QUESTION_IDS = new Set([
  "ms700-q62",
  "ms700-q100",
  "ms700-q105",
  "ms700-q119",
  "ms700-q238",
  "ms700-q243",
  "ms700-q258",
  "ms700-q261",
  "ms700-q263",
  "ms700-q293",
  "ms700-q296",
  "ms700-q308",
  "ms700-q310",
  "ms700-q334",
  "ms700-q342",
  "ms700-q350",
  "ms700-q358",
  "ms700-q362",
  "ms700-q363",
  "ms700-q368",
  "ms700-q386",
  "ms700-q400",
]);

const YESNO_ALT_QUESTION_IDS = new Set([
  "az500-q5",
  "az500-q9",
  "az500-q10",
  "az500-q36",
  "az500-q43",
  "az500-q66",
  "az500-q67",
  "az500-q68",
  "az500-q72",
  "az500-q74",
  "az500-q77",
  "az500-q85",
  "az500-q91",
  "az500-q92",
  "az500-q97",
  "az500-q119",
  "az500-q121",
  "az500-q129",
  "az500-q134",
  "az500-q136",
  "az500-q152",
  "az500-q157",
  "az500-q172",
  "az500-q174",
  "az500-q176",
  "az500-q180",
  "az500-q201",
  "az500-q204",
  "az500-q206",
  "az500-q212",
  "az500-q219",
  "az500-q243",
  "az500-q248",
  "az500-q252",
  "az500-q255",
  "az500-q256",
  "az500-q269",
  "az500-q276",
  "az500-q278",
  "az500-q280",
  "az500-q285",
  "az500-q286",
  "az500-q292",
  "az500-q295",
  "az500-q296",
  "az500-q298",
  "az500-q314",
  "az500-q326",
  "az500-q339",
  "az500-q340",
  "az500-q342",
  "az500-q349",
  "az500-q355",
  "az500-q370",
  "az500-q371",
  "az500-q374",
  "az500-q377",
  "az500-q383",
  "az500-q384",
  "az500-q385",
  "az500-q405",
  "az500-q407",
  "az500-q425",
  "az500-q431",
  "az500-q460",
  "az500-q464",
  "az500-q466",
  "az500-q471",
  "az500-q475",
  "az500-q480",
  "ms700-q4",
  "ms700-q20",
  "ms700-q72",
  "ms700-q98",
  "ms700-q104",
  "ms700-q112",
  "ms700-q114",
  "ms700-q117",
  "ms700-q128",
  "ms700-q162",
  "ms700-q195",
  "ms700-q206",
  "ms700-q239",
  "ms700-q248",
  "ms700-q257",
  "ms700-q267",
  "ms700-q269",
  "ms700-q272",
  "ms700-q275",
  "ms700-q294",
  "ms700-q298",
  "ms700-q305",
  "ms700-q309",
  "ms700-q315",
  "ms700-q340",
  "ms700-q352",
  "ms700-q355",
  "ms700-q371",
  "ms700-q391",
  "ms700-q149",
]);

function classifyQuestionTypeRaw(q) {
  if (!q) return "mcq";
  const qid = String(q.id || "").toLowerCase();
  if (MATRIX_ONLY_QUESTION_IDS.has(qid)) return "matrix";
  if (q.filterType === "laborio" || LABORIO_QUESTION_IDS.has(qid)) return "laborio";
  if (q.filterType === "yesnoalt" || q.filterType === "yesno-alternativa" || YESNO_ALT_QUESTION_IDS.has(qid)) return "yesnoalt";
  if (YESNO_QUESTION_IDS.has(qid)) return "yesno";
  if (q.type === "dragMatch") return "drag";
  if (INLINE_QUESTION_IDS.has(qid) || q.type === "inlineDropdown") return "inline";
  if (q.type === "dropdownMatrix") return "matrix";

  // Incompatível: placeholder único
  const answers = Array.isArray(q.answers) ? q.answers : [];
  const ca = q.correctAnswer;
  if (
    answers.length === 1 &&
    typeof answers[0] === "string" &&
    typeof ca === "string" &&
    UNSUPPORTED_PLACEHOLDER_REGEX.test(answers[0].trim()) &&
    UNSUPPORTED_PLACEHOLDER_REGEX.test(ca.trim())
  ) return "unsupported";

  return "mcq";
}

function isDragMatchQuestion(qRun) {
  return !!qRun && qRun.type === "dragMatch";
}

function cloneDragValues(v) {
  const out = {};
  if (!v || typeof v !== "object") return out;
  Object.keys(v).forEach(tid => { out[tid] = v[tid]; });
  return out;
}

function getDragRequiredCount(qRun) {
  if (!isDragMatchQuestion(qRun)) return 0;
  return (qRun.targets || []).length || 0;
}

function getFilledDragCount(qRun, dragValues) {
  if (!isDragMatchQuestion(qRun)) return 0;
  let c = 0;
  (qRun.targets || []).forEach(t => {
    const v = dragValues?.[t.id];
    if (typeof v === "string" && v.trim() !== "") c++;
  });
  return c;
}

function evaluateDragIsCorrect(qRun, dragValues) {
  if (!isDragMatchQuestion(qRun)) return false;
  for (const t of (qRun.targets || [])) {
    const expected = qRun.correctByTarget?.[t.id];
    const actual = dragValues?.[t.id] || "";

    if (!expected) return false;

    if (Array.isArray(expected)) {
      if (!expected.includes(actual)) return false;
    } else {
      if (actual !== expected) return false;
    }
  }
  return true;
}

function getDragItemLabel(qRun, itemId) {
  const it = (qRun.items || []).find(x => x.id === itemId);
  return it ? it.label : "";
}
function cloneDropdownValues(v) {
  const out = {};
  if (!v || typeof v !== "object") return out;
  Object.keys(v).forEach(rowId => {
    out[rowId] = { ...(v[rowId] || {}) };
  });
  return out;
}

function getDropdownRequiredCellCount(qRun) {
  if (!isDropdownQuestion(qRun)) return 0;
  return (qRun.rows?.length || 0) * (qRun.columns?.length || 0);
}

function getFilledDropdownCellCount(qRun, dropdownValues) {
  if (!isDropdownQuestion(qRun)) return 0;
  let count = 0;
  (qRun.rows || []).forEach(row => {
    (qRun.columns || []).forEach(col => {
      const v = dropdownValues?.[row.id]?.[col.id];
      if (typeof v === "string" && v.trim() !== "") count++;
    });
  });
  return count;
}

function evaluateDropdownIsCorrect(qRun, dropdownValues) {
  if (!isDropdownQuestion(qRun)) return false;
  for (const row of (qRun.rows || [])) {
    for (const col of (qRun.columns || [])) {
      const expected = col.correctByRow?.[row.id];
      const actual = dropdownValues?.[row.id]?.[col.id] || "";
      if (!expected || actual !== expected) return false;
    }
  }
  return true;
}

function isQuestionAnswered(qRun, ans) {
  if (!qRun || !ans) return false;

  if (isDragMatchQuestion(qRun)) {
    const required = getDragRequiredCount(qRun);
    const filled = getFilledDragCount(qRun, ans.dragValues);
    return required > 0 && filled === required;
  }

  if (isInlineDropdownQuestion(qRun)) {
    const required = getInlineRequiredCount(qRun);
    const filled = getFilledInlineCount(qRun, ans.inlineValues);
    return required > 0 && filled === required;
  }

  if (isDropdownQuestion(qRun)) {
    const required = getDropdownRequiredCellCount(qRun);
    const filled = getFilledDropdownCellCount(qRun, ans.dropdownValues);
    return required > 0 && filled === required;
  }

  return !!(ans.chosenKeys && ans.chosenKeys.length > 0);
}

function isUnsupportedPlaceholderText(v) {
  return typeof v === "string" && UNSUPPORTED_PLACEHOLDER_REGEX.test(v.trim());
}

function isUnsupportedPlaceholderQuestion(qRun) {
  if (!qRun || isDropdownQuestion(qRun) || isDragMatchQuestion(qRun) || isInlineDropdownQuestion(qRun)) return false;

  const answers = Array.isArray(qRun.answers)
    ? qRun.answers
    : Object.values(qRun.mappingFixed || {});

  const correctValues = Array.isArray(qRun.correctValuesFixed)
    ? qRun.correctValuesFixed
    : (Array.isArray(qRun.correctAnswer) ? qRun.correctAnswer : [qRun.correctAnswer]);

  return (
    answers.length === 1 &&
    correctValues.length === 1 &&
    isUnsupportedPlaceholderText(answers[0]) &&
    isUnsupportedPlaceholderText(correctValues[0])
  );
}

function getCorrectAnswerLines(qRun) {
  if (isDragMatchQuestion(qRun)) {
    const lines = [];
    (qRun.targets || []).forEach(t => {
      const expected = qRun.correctByTarget?.[t.id];

      if (Array.isArray(expected)) {
        const labels = expected
          .map(id => getDragItemLabel(qRun, id))
          .filter(Boolean);
        const uniqueLabels = [...new Set(labels)];
        lines.push(`${t.label}: ${uniqueLabels.join(" / ") || "-"}`);
      } else {
        const label = getDragItemLabel(qRun, expected || "");
        lines.push(`${t.label}: ${label || "-"}`);
      }
    });
    return lines;
  }

  if (isInlineDropdownQuestion(qRun)) {
    const lines = [];
    const slots = qRun.inline?.slots || {};
    Object.keys(slots).forEach(k => {
      const expected = slots[k]?.correct || "-";
      const lbl = slots[k]?.label || k;
      lines.push(`${lbl}: ${expected}`);
    });
    return lines;
  }

  if (isDropdownQuestion(qRun)) {
    const lines = [];
    (qRun.rows || []).forEach(row => {
      const parts = (qRun.columns || []).map(col => `${col.label}: ${col.correctByRow?.[row.id] || "-"}`);
      lines.push(`${row.label}: ${parts.join(" | ")}`);
    });
    return lines;
  }

  return (qRun.correctKeysFixed || []).map(k => `${k}. ${qRun.mappingFixed[k]}`);
}

function isYesNoOptions(options) {
  const vals = (options || []).map(v => String(v || "").trim().toLowerCase());
  return vals.length === 2 && vals.includes("yes") && vals.includes("no");
}

function shouldRenderRadioForColumn(qRun, col) {
  if (!col) return false;
  if (col.inputType === "radio") return true;
  if (col.inputType === "select") return false;

  const isSingleColumn = (qRun.columns || []).length === 1;
  return isSingleColumn && isYesNoOptions(col.options || []);
}

function isBinaryYesNoSingleColumnQuestion(qRun) {
  if (!isDropdownQuestion(qRun)) return false;
  if ((qRun.columns || []).length !== 1) return false;
  const col = qRun.columns[0];
  return shouldRenderRadioForColumn(qRun, col) && isYesNoOptions(col.options || []);
}

function renderDropdownQuestion(qRun, savedDropdownValues) {
  const wrapper = document.createElement("div");
  wrapper.className = "ddqWrap";

  const isYesNoMatrix = isBinaryYesNoSingleColumnQuestion(qRun);
  const yesNoCol = isYesNoMatrix ? (qRun.columns || [])[0] : null;

  const help = document.createElement("div");
  help.className = "ddqHelp";
  help.textContent = isYesNoMatrix ? "Marque Yes ou No em cada item." : "Selecione uma opção em cada campo.";
  wrapper.appendChild(help);

  const table = document.createElement("table");
  table.className = "ddqTable" + (isYesNoMatrix ? " ddqTable--yesno" : "");

  const thead = document.createElement("thead");
  const htr = document.createElement("tr");
  const thRow = document.createElement("th");
  thRow.textContent = "Item";
  htr.appendChild(thRow);

  if (isYesNoMatrix) {
    ["Yes", "No"].forEach(lbl => {
      const th = document.createElement("th");
      th.className = "ddqYNCol";
      th.textContent = lbl;
      htr.appendChild(th);
    });
  } else {
    (qRun.columns || []).forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      htr.appendChild(th);
    });
  }

  thead.appendChild(htr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  (qRun.rows || []).forEach(row => {
    const tr = document.createElement("tr");

    const tdLabel = document.createElement("td");
    tdLabel.className = "ddqRowHead";
    tdLabel.textContent = row.label;
    tr.appendChild(tdLabel);

    if (isYesNoMatrix) {
      const currentValue = savedDropdownValues?.[row.id]?.[yesNoCol.id] || "";
      ["Yes", "No"].forEach(optVal => {
        const td = document.createElement("td");
        td.className = "ddqYNCell";

        const label = document.createElement("label");
        label.className = "ddqRadioOnly";
        label.title = optVal;

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `ddq-${qRun.id}-${row.id}-${yesNoCol.id}`;
        radio.value = optVal;
        radio.checked = currentValue === optVal;
        radio.setAttribute("aria-label", `${row.label} - ${optVal}`);
        radio.addEventListener("change", (e) => {
          if (e.target.checked) onDropdownChange(row.id, yesNoCol.id, optVal);
        });

        label.appendChild(radio);
        td.appendChild(label);
        tr.appendChild(td);
      });
    } else {
      (qRun.columns || []).forEach(col => {
        const td = document.createElement("td");
        const currentValue = savedDropdownValues?.[row.id]?.[col.id] || "";
        const rowOptions = Array.isArray(col.optionsByRow?.[row.id])
          ? col.optionsByRow[row.id]
          : (Array.isArray(row.options) ? row.options : (col.options || []));

        if (shouldRenderRadioForColumn(qRun, col)) {
          td.classList.add("ddqCell--binary");

          const radioWrap = document.createElement("div");
          radioWrap.className = "ddqRadioGroup";

          (rowOptions || []).forEach(optVal => {
            const label = document.createElement("label");
            label.className = "ddqRadioOpt";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `ddq-${qRun.id}-${row.id}-${col.id}`;
            radio.value = optVal;
            radio.checked = currentValue === optVal;
            radio.addEventListener("change", (e) => {
              if (e.target.checked) onDropdownChange(row.id, col.id, optVal);
            });

            const text = document.createElement("span");
            text.textContent = optVal;

            label.appendChild(radio);
            label.appendChild(text);
            radioWrap.appendChild(label);
          });

          td.appendChild(radioWrap);
        } else {
          const sel = document.createElement("select");

          const emptyOpt = document.createElement("option");
          emptyOpt.value = "";
          emptyOpt.textContent = "Selecione...";
          sel.appendChild(emptyOpt);

          (rowOptions || []).forEach(optVal => {
            const opt = document.createElement("option");
            opt.value = optVal;
            opt.textContent = optVal;
            sel.appendChild(opt);
          });

          sel.value = currentValue;
          sel.addEventListener("change", (e) => onDropdownChange(row.id, col.id, e.target.value));

          td.appendChild(sel);
        }

        tr.appendChild(td);
      });
    }

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);
  optsEl.appendChild(wrapper);
}



function renderInlineDropdownQuestion(qRun, savedInlineValues) {
  const wrapper = document.createElement("div");
  wrapper.className = "inlineWrap";

  const inlineValues = cloneInlineValues(savedInlineValues || {});
  const parts = qRun.inline?.parts || [];
  const slots = qRun.inline?.slots || {};

  function commit() {
    const required = getInlineRequiredCount(qRun);
    const filled = getFilledInlineCount(qRun, inlineValues);
    const fullyAnswered = required > 0 && filled === required;
    const isCorrect = fullyAnswered ? evaluateInlineIsCorrect(qRun, inlineValues) : false;

    userAnswers.set(qRun.id, { inlineValues: cloneInlineValues(inlineValues), isCorrect });
    refreshQuestionJumpOptions();
    updateFeedbackForCurrentQuestion();
  }

  function makeLine() {
    const line = document.createElement("div");
    line.className = "inlineLine";
    wrapper.appendChild(line);
    return line;
  }

  let line = makeLine();

  parts.forEach(part => {
    // Quebra de linha explícita
    if (part && part.br) {
      line = makeLine();
      return;
    }

    // Texto (pode conter \n)
    if (part && typeof part.text === "string") {
      const chunks = String(part.text).split("\n");
      chunks.forEach((t, idx) => {
        if (idx > 0) line = makeLine();
        if (t) {
          const span = document.createElement("span");
          span.textContent = t;
          line.appendChild(span);
        }
      });
      return;
    }

    // Slot (dropdown)
    const slotKey = part?.slot;
    if (slotKey && slots[slotKey]) {
      const sel = document.createElement("select");
      sel.className = "inlineSel";
      sel.setAttribute("aria-label", slots[slotKey]?.label || slotKey);

      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "Selecione...";
      sel.appendChild(opt0);

      (slots[slotKey].options || []).forEach(v => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = v;
        sel.appendChild(o);
      });

      sel.value = inlineValues[slotKey] || "";

      sel.addEventListener("change", () => {
        if (timedOut) return;
        inlineValues[slotKey] = sel.value || "";
        commit();
      });

      line.appendChild(sel);
      return;
    }
  });

  optsEl.appendChild(wrapper);
  commit();
}

function renderDragMatchQuestion(qRun, savedDragValues) {
  const wrapper = document.createElement("div");
  wrapper.className = "dragWrap";

  let selectedItemId = "";
  const dragValues = cloneDragValues(savedDragValues || {});

  const leftCol = document.createElement("div");
  leftCol.className = "dragCol dragColOptions";
  const lt = document.createElement("div");
  lt.className = "dragTitle";
  lt.textContent = "Opções";
  leftCol.appendChild(lt);

  const lh = document.createElement("div");
  lh.className = "dragHint";
  lh.textContent = "Arraste um bloco para a direita, ou clique em uma opção e depois clique no encaixe.";
  leftCol.appendChild(lh);

  const itemsWrap = document.createElement("div");
  itemsWrap.className = "dragItems dragItemsScroll";
  leftCol.appendChild(itemsWrap);

  const rightCol = document.createElement("div");
  rightCol.className = "dragCol dragColAnswer";
  const rt = document.createElement("div");
  rt.className = "dragTitle";
  rt.textContent = "Answer area";
  rightCol.appendChild(rt);

  const rh = document.createElement("div");
  rh.className = "dragHint";
  rh.textContent = "Preencha todos os encaixes.";
  rightCol.appendChild(rh);

  const targetsWrap = document.createElement("div");
  targetsWrap.className = "dragTargets dragTargetsScroll";
  rightCol.appendChild(targetsWrap);

  function getAssignedItemIds() {
    return new Set(Object.values(dragValues || {}).filter(Boolean));
  }

  function renderItems() {
    itemsWrap.innerHTML = "";
    const assigned = getAssignedItemIds();

    (qRun.items || []).forEach(it => {
      const div = document.createElement("div");
      div.className = "dragItem" + (selectedItemId === it.id ? " selected" : "") + (assigned.has(it.id) ? " disabled" : "");
      div.textContent = it.label;
      div.draggable = !assigned.has(it.id);
      div.dataset.itemId = it.id;

      div.addEventListener("click", () => {
        if (assigned.has(it.id)) return;
        selectedItemId = (selectedItemId === it.id) ? "" : it.id;
        renderItems();
      });

      div.addEventListener("dragstart", (e) => {
        if (assigned.has(it.id)) { e.preventDefault(); return; }
        e.dataTransfer.setData("text/plain", it.id);
        e.dataTransfer.effectAllowed = "move";
      });

      itemsWrap.appendChild(div);
    });
  }

  function clearTarget(targetId) {
    if (!dragValues[targetId]) return;
    delete dragValues[targetId];
    onDragAssign(dragValues);
  }

  function assignToTarget(targetId, itemId) {
    if (!itemId) return;
    // remove item from any other target (one-to-one)
    Object.keys(dragValues).forEach(tid => {
      if (dragValues[tid] === itemId) delete dragValues[tid];
    });
    dragValues[targetId] = itemId;
    selectedItemId = "";
    onDragAssign(dragValues);
  }

  function renderTargets() {
    targetsWrap.innerHTML = "";
    (qRun.targets || []).forEach(t => {
      const row = document.createElement("div");
      row.className = "dragTargetRow";

      const lab = document.createElement("div");
      lab.className = "dragTargetLabel";
      lab.textContent = t.label;
      row.appendChild(lab);

      const dz = document.createElement("div");
      dz.className = "dropZone" + (dragValues[t.id] ? " filled" : "");
      dz.dataset.targetId = t.id;

      const txt = document.createElement("div");
      txt.className = "dzText";
      txt.textContent = dragValues[t.id] ? getDragItemLabel(qRun, dragValues[t.id]) : "Solte aqui / clique aqui";
      dz.appendChild(txt);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dzClear";
      btn.textContent = "Limpar";
      btn.disabled = !dragValues[t.id];
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        clearTarget(t.id);
      });
      dz.appendChild(btn);

      dz.addEventListener("click", () => {
        if (!selectedItemId) return;
        assignToTarget(t.id, selectedItemId);
      });

      dz.addEventListener("dragover", (e) => {
        e.preventDefault();
        dz.classList.add("over");
      });
      dz.addEventListener("dragleave", () => dz.classList.remove("over"));
      dz.addEventListener("drop", (e) => {
        e.preventDefault();
        dz.classList.remove("over");
        const itemId = e.dataTransfer.getData("text/plain");
        assignToTarget(t.id, itemId);
      });

      row.appendChild(dz);
      targetsWrap.appendChild(row);
    });
  }

  function onDragAssign(newDragValues) {
    if (timedOut) return;

    const q = questionsRun[idx];
    if (!isDragMatchQuestion(q)) return;

    const dv = cloneDragValues(newDragValues || {});
    const fullyAnswered = getFilledDragCount(q, dv) === getDragRequiredCount(q);
    const isCorrect = fullyAnswered ? evaluateDragIsCorrect(q, dv) : false;

    userAnswers.set(q.id, { dragValues: dv, isCorrect });

    refreshQuestionJumpOptions();
    renderItems();
    renderTargets();
    updateFeedbackForCurrentQuestion();
  }

  wrapper.appendChild(leftCol);
  wrapper.appendChild(rightCol);
  optsEl.appendChild(wrapper);

  renderItems();
  renderTargets();
}


function updateFeedbackForCurrentQuestion() {
  // Permite avançar mesmo sem responder a questão atual (pular), sem exibir certo/errado durante o teste.
  nextBtn.disabled = false;
  clearMsg(msgEl);
}

      function buildRun(sourceQuestions) {
  let list = orderQuestionsBySelectedLevel(sourceQuestions || []);

  return list.map(q => {
    if (q.type === "dropdownMatrix") {
      return {
        ...q,
        rows: (q.rows || []).map(r => ({ ...r })),
        columns: (q.columns || []).map(c => ({
          ...c,
          options: shuffle(c.options || []),
          optionsByRow: Object.keys(c.optionsByRow || {}).reduce((acc, k) => {
            acc[k] = shuffle(c.optionsByRow?.[k] || []);
            return acc;
          }, {}),
          correctByRow: { ...(c.correctByRow || {}) }
        }))
      };
    }

    if (q.type === "dragMatch") {
      return {
        ...q,
        items: shuffle(q.items || []).map(it => ({ ...it })),
        targets: (q.targets || []).map(t => ({ ...t })),
        correctByTarget: { ...(q.correctByTarget || {}) }
      };
    }

    if (q.type === "inlineDropdown") {
      return {
        ...q,
        inline: {
          parts: (q.inline?.parts || []).map(p => ({ ...p })),
          slots: Object.keys(q.inline?.slots || {}).reduce((acc, k) => {
            const s = q.inline.slots[k] || {};
            acc[k] = { ...s, options: shuffle(s.options || []) };
            return acc;
          }, {})
        }
      };
    }


    const answers = shuffle(q.answers || []);

    const keys = buildOptionKeys(answers.length);
    const mapping = {};

    const correctValues = Array.isArray(q.correctAnswer) ? q.correctAnswer.slice() : [q.correctAnswer];
    const correctKeys = [];

    keys.forEach((k, i) => {
      mapping[k] = answers[i];
      if (correctValues.includes(answers[i])) correctKeys.push(k);
    });

    return {
      ...q,
      keysFixed: keys,
      mappingFixed: mapping,
      correctValuesFixed: correctValues,
      correctKeysFixed: correctKeys
    };
  });
}


      function getQuestionNumberForRange(qObj) {
        const id = String(qObj?.id || "");
        let m = id.match(/-q(\d+)\b/i);
        if (m) return parseInt(m[1], 10);
        const p = String(qObj?.prompt || "");
        m = p.match(/\bNO\.(\d+)\b/i);
        if (m) return parseInt(m[1], 10);
        return null;
      }

      function parseQuestionRange(raw) {
        const s = String(raw || "").trim();
        if (!s) return null;
        const m = s.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
        if (!m) return { error: true };
        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) return { error: true };
        if (a > b) return { error: true };
        return { from: a, to: b };
      }

      function getQuestionsBySkillAndLevel(skillIds, levelIds){
        const levelSet = new Set(levelIds || []);
        return (skillIds || []).flatMap(skillId => {
          const qs = Array.isArray(questionBank[skillId]) ? questionBank[skillId] : [];
          return qs.map(q => ({ ...q, skillId: q.skillId || skillId, sourceExamName: skillId }));
        }).filter(q => {
          if (!levelSet.size) return false;
          return levelSet.has(q.level || "Foundational");
        });
      }

      function getSelectedExamQuestions() {
        return getQuestionsBySkillAndLevel(getSelectedSkillIds(), getSelectedLevelIds());
      }

      function buildSelectionLabel(skillIds, levelIds){
        const skillLabel = getSkillListLabel(skillIds);
        const levelLabel = (levelIds.length === SCALE_LEVELS.length) ? "Todos os níveis" : levelIds.join(" + ");
        return `${skillLabel} | ${levelLabel}`;
      }

      async function updateExamInfo() {
        clearMsg(menuMsg);
        const skills = getSelectedSkillIds();
        const levels = getSelectedLevelIds();

        if (skills.length === 0) {
          examInfo.textContent = "Selecione uma Skill ou um Time para iniciar.";
          startBtn.disabled = true;
          return;
        }
        if (levels.length === 0) {
          examInfo.textContent = "Selecione pelo menos um nível.";
          startBtn.disabled = true;
          return;
        }

        examInfo.textContent = `Carregando questões de ${skills.length} skill(s)...`;
        startBtn.disabled = true;
        await Promise.all(skills.map(skillId => ensureExamLoaded(skillId)));

        const selectedQuestions = getQuestionsBySkillAndLevel(skills, levels);
        const levelInfo = levels.length === SCALE_LEVELS.length ? "todos os níveis" : levels.join(", ");
        const timerInfo = optSkillTimer?.checked ? ` | Timer: ${formatMMSS(selectedQuestions.length * TIMER_SECONDS_PER_QUESTION)}` : " | Timer: Off";
        examInfo.textContent = `Questões disponíveis: ${selectedQuestions.length} | Skills: ${skills.length} | Níveis: ${levelInfo}${timerInfo}`;

        if (!selectedQuestions.length) {
          setMsg(menuMsg, "⚠️ Não há questões cadastradas para a combinação selecionada.", "warn");
          startBtn.disabled = true;
        } else {
          startBtn.disabled = false;
        }
      }

      async function startRun(){
        const skills = getSelectedSkillIds();
        const levels = getSelectedLevelIds();
        startBtn.disabled = true;
        clearMsg(menuMsg);

        if (skills.length === 0) {
          setMsg(menuMsg, "⚠️ Selecione ao menos uma Skill ou um Time.", "warn");
          startBtn.disabled = false;
          return;
        }
        if (levels.length === 0) {
          setMsg(menuMsg, "⚠️ Selecione ao menos um nível.", "warn");
          startBtn.disabled = false;
          return;
        }

        await Promise.all(skills.map(skillId => ensureExamLoaded(skillId)));
        let selectedQuestions = getQuestionsBySkillAndLevel(skills, levels);

        const typeFilter = {
          mcq: true,
          matrix: true,
          yesno: true,
          yesnoalt: true,
          inline: true,
          drag: true,
          laborio: true,
          unsupported: false
        };

        selectedQuestions = selectedQuestions.filter(q => {
          const t = classifyQuestionTypeRaw(q);
          return !!typeFilter[t];
        });

        if (!selectedQuestions.length) {
          setMsg(menuMsg, "⚠️ Nenhuma questão corresponde à seleção atual.", "warn");
          startBtn.disabled = false;
          return;
        }

        const selectionLabel = buildSelectionLabel(skills, levels);
        runSettings = {
          examName: skills.join(","),
          selectedSkillIds: skills.slice(),
          selectedLevels: levels.slice(),
          time: optTime?.value || "",
          skillDisplayName: selectionLabel,
          passThreshold: 70,
          shuffleQuestions: false,
          shuffleAnswers: true,
          showFeedback: false,
          showCorrectOnWrong: false,
          timerEnabled: !!optSkillTimer?.checked,
          timerSeconds: 0,
          typeFilter
        };

        examPill.textContent = `Skill: ${selectionLabel}`;
        resultTitleEl.textContent = `Resultado — ${selectionLabel}`;

        userAnswers.clear();
        idx = 0;
        questionsRun = buildRun(selectedQuestions);
        runSettings.timerSeconds = questionsRun.length * TIMER_SECONDS_PER_QUESTION;
        refreshQuestionJumpOptions();

        gotoQuiz();
        startTimerIfEnabled();
        render();
      }


      function render(){
        clearMsg(msgEl);

        const q = questionsRun[idx];
        if (!q) { showResults(false); return; }

        qTitleExamEl.textContent = runSettings.skillDisplayName || runSettings.examName;
        qTitleOfEl.textContent = `de ${questionsRun.length}`;
        qPromptEl.innerHTML = formatPromptHtml(getPromptForDisplay(q));
        refreshQuestionJumpOptions();

        const thisRenderToken = ++imageRenderToken;

        function setQuestionImage(el, bases, warnLabel, showWarn) {
          el.onload = null;
          el.onerror = null;

          const baseList = Array.isArray(bases) ? bases : [bases];
          const cleaned = baseList
            .map(v => String(v || "").trim())
            .filter(v => v);

          if (cleaned.length === 0) {
            el.removeAttribute("src");
            hide(el);
            return;
          }

          const candidates = [];
          const seen = new Set();
          cleaned.forEach(b => {
            const hasExt = /\.(png|jpg|jpeg|webp)$/i.test(b);
            const c = hasExt ? [b] : [b, `${b}.png`, `${b}.jpg`, `${b}.jpeg`, `${b}.webp`];
            c.forEach(u => {
              const key = u.toLowerCase();
              if (!seen.has(key)) { seen.add(key); candidates.push(u); }
            });
          });

          let imgTry = 0;

          el.onload = () => {
            if (thisRenderToken !== imageRenderToken) return;
            show(el);
          };

          el.onerror = () => {
            if (thisRenderToken !== imageRenderToken) return;
            imgTry++;
            if (imgTry < candidates.length) {
              el.src = candidates[imgTry];
              return;
            }
            hide(el);
            if (showWarn) setMsg(msgEl, `⚠️ Não consegui carregar a imagem: "${warnLabel}".`, "warn");
          };

          el.src = candidates[imgTry];
        }

                // Auto-carrega imagens pelo padrão: <PASTA_DA_SKILL>/<skill><q><numero>[.<2..5>]
        function examPrefixFromName(name) {
          return String(name || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
        }
        function examFolderFromName(name) {
          return String(name || "").trim().replace(/[\\/]+$/g, "");
        }
        function questionNumberFrom(qObj) {
          const id = String(qObj?.id || "");
          let m = id.match(/-q(\d+)\b/i);
          if (m) return parseInt(m[1], 10);
          const p = String(qObj?.prompt || "");
          m = p.match(/\bNO\.\s*(\d+)\b/i);
          if (m) return parseInt(m[1], 10);
          return null;
        }
        function isFullImagePath(value) {
          const v = String(value || "").trim();
          return /^(?:https?:|data:|blob:|file:|[a-z]:\\|\\\\|\/)/i.test(v) || v.includes("/") || v.includes("\\");
        }
        function buildImageBaseCandidates(baseName, folder) {
          const raw = String(baseName || "").trim();
          if (!raw) return [];

          const out = [];
          const seen = new Set();
          const push = (v) => {
            const s = String(v || "").trim().replace(/\\/g, "/");
            if (!s) return;
            const key = s.toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              out.push(s);
            }
          };

          if (isFullImagePath(raw)) {
            push(raw);
          } else {
            push(raw);
            if (folder) push(`${folder}/${raw}`);
          }

          return out;
        }

        const exPrefix = examPrefixFromName(runSettings.examName);
        const examFolder = examFolderFromName(runSettings.examName);
        const qNum = questionNumberFrom(q);
        const stem = (exPrefix && qNum != null) ? `${exPrefix}q${qNum}` : "";

        const autoImgs = stem ? [
          buildImageBaseCandidates(stem, examFolder),
          buildImageBaseCandidates(`${stem}.2`, examFolder),
          buildImageBaseCandidates(`${stem}.3`, examFolder),
          buildImageBaseCandidates(`${stem}.4`, examFolder),
          buildImageBaseCandidates(`${stem}.5`, examFolder)
        ] : [[], [], [], [], []];

        // Mantém compatibilidade: se existir q.image/q.image2/etc, tenta junto.
        setQuestionImage(imgEl,  [...autoImgs[0], ...buildImageBaseCandidates(q.image,  examFolder)], autoImgs[0][0] || q.image,  false);
        setQuestionImage(imgEl2, [...autoImgs[1], ...buildImageBaseCandidates(q.image2, examFolder)], autoImgs[1][0] || q.image2, false);
        setQuestionImage(imgEl3, [...autoImgs[2], ...buildImageBaseCandidates(q.image3, examFolder)], autoImgs[2][0] || q.image3, false);
        setQuestionImage(imgEl4, [...autoImgs[3], ...buildImageBaseCandidates(q.image4, examFolder)], autoImgs[3][0] || q.image4, false);
        setQuestionImage(imgEl5, [...autoImgs[4], ...buildImageBaseCandidates(q.image5, examFolder)], autoImgs[4][0] || q.image5, false);

optsEl.innerHTML = "";
        const saved = userAnswers.get(q.id);
        const savedKeys = saved?.chosenKeys || [];

        if (isDragMatchQuestion(q)) {
          renderDragMatchQuestion(q, saved?.dragValues || {});
        } else if (isInlineDropdownQuestion(q)) {
          renderInlineDropdownQuestion(q, saved?.inlineValues || {});
        } else if (isDropdownQuestion(q)) {
          renderDropdownQuestion(q, saved?.dropdownValues || {});
        } else {
          q.keysFixed.forEach((key) => {
            const b = document.createElement("button");
            b.className = "opt" + (savedKeys.includes(key) ? " selected" : "");
            b.textContent = `${key}. ${q.mappingFixed[key]}`;
            b.addEventListener("click", () => onChoose(key));
            optsEl.appendChild(b);
          });
        }

        prevBtn.disabled = idx === 0;
        // Permite ir para a próxima questão mesmo sem resposta.
        nextBtn.disabled = false;
        nextBtn.textContent = (idx === questionsRun.length - 1) ? "Finalizar" : "Próxima";

        // Durante a execução do teste, o usuário não recebe indicação de certo/errado.
        clearMsg(msgEl);
      }

      function onChoose(chosenKey){
        if (timedOut) return;

        const q = questionsRun[idx];
        if (isDropdownQuestion(q)) return;
        const saved = userAnswers.get(q.id);
        const currentKeys = saved?.chosenKeys ? saved.chosenKeys.slice() : [];

        const multi = isMulti(q);

        let newKeys;
        if (!multi) {
          newKeys = [chosenKey];
        } else {
          if (currentKeys.includes(chosenKey)) newKeys = currentKeys.filter(k => k !== chosenKey);
          else newKeys = currentKeys.concat([chosenKey]);
        }

        const isCorrect = (newKeys.length > 0) ? evaluateIsCorrect(q, newKeys) : false;
        userAnswers.set(q.id, { chosenKeys: newKeys, isCorrect });

        refreshQuestionJumpOptions();

        Array.from(optsEl.querySelectorAll("button.opt")).forEach(btn => {
          const isSelected = newKeys.some(k => btn.textContent.startsWith(k + "."));
          btn.classList.toggle("selected", isSelected);
        });

        updateFeedbackForCurrentQuestion();
      }

function onDropdownChange(rowId, colId, value){
  if (timedOut) return;

  const q = questionsRun[idx];
  if (!isDropdownQuestion(q)) return;

  const saved = userAnswers.get(q.id);
  const dropdownValues = cloneDropdownValues(saved?.dropdownValues || {});

  dropdownValues[rowId] = dropdownValues[rowId] || {};
  dropdownValues[rowId][colId] = value || "";

  const fullyAnswered = getFilledDropdownCellCount(q, dropdownValues) === getDropdownRequiredCellCount(q);
  const isCorrect = fullyAnswered ? evaluateDropdownIsCorrect(q, dropdownValues) : false;

  userAnswers.set(q.id, { dropdownValues, isCorrect });

  refreshQuestionJumpOptions();
  updateFeedbackForCurrentQuestion();
}

      function goNext(){
        if (timedOut) return;

        // Permite pular questões sem responder.
        if (idx === questionsRun.length - 1) { showResults(false, true); return; }
        idx++;
        render();
      }

      function goPrev(){
        if (timedOut) return;
        if (idx === 0) return;
        idx--;
        render();
      }

      function finishExam(){
        if (timedOut) return;
        const ok = window.confirm("Finalizar o teste agora? Questões não respondidas serão consideradas erradas.");
        if (!ok) return;
        showResults(false, true);
      }

      // ✅ ALTERAÇÃO: questões em formato não suportado NÃO entram no cálculo de %.
      // ✅ Se o usuário não finalizar (timeout), as não respondidas contam como erradas apenas entre as questões válidas.
      function getScaleLabel(score){
        const s = Number(score) || 0;
        if (s < 50) return "No skill";
        if (s < 150) return "Foundational";
        if (s < 250) return "Intermediate";
        if (s < 350) return "Advanced";
        return "Expert";
      }

      function calculateScaleResults(scoredQuestions){
        const selectedSkills = runSettings.selectedSkillIds || getSelectedSkillIds();
        const overallByLevel = {};
        SCALE_LEVELS.forEach(level => overallByLevel[level] = { total: 0, correct: 0 });

        const rows = selectedSkills.map(skillId => {
          const skillQuestions = scoredQuestions.filter(q => (q.skillId || q.sourceExamName) === skillId);
          const total = skillQuestions.length;
          let correct = 0;
          const byLevel = {};
          SCALE_LEVELS.forEach(level => byLevel[level] = { total: 0, correct: 0 });

          skillQuestions.forEach(q => {
            const ans = userAnswers.get(q.id);
            const ok = !!ans?.isCorrect;
            const level = q.level || "Foundational";
            if (!byLevel[level]) byLevel[level] = { total: 0, correct: 0 };
            if (!overallByLevel[level]) overallByLevel[level] = { total: 0, correct: 0 };
            byLevel[level].total++;
            overallByLevel[level].total++;
            if (ok) {
              byLevel[level].correct++;
              overallByLevel[level].correct++;
              correct++;
            }
          });

          let score = 0;
          SCALE_LEVELS.forEach(level => {
            const r = byLevel[level];
            if (r && r.total > 0 && (r.correct / r.total) >= 0.7) {
              score = Math.max(score, LEVEL_SCORE_MAP[level] || 0);
            }
          });

          return {
            skillId,
            skill: (skillQuestions[0]?.skill) || getSkillDisplayName(skillId),
            total,
            correct,
            wrong: Math.max(0, total - correct),
            pct: total ? Math.round((correct / total) * 100) : 0,
            score,
            label: getScaleLabel(score),
            byLevel
          };
        });

        const orderedSelectedLevels = getOrderedSelectedLevels();
        const levelRows = orderedSelectedLevels.map(level => {
          const r = overallByLevel[level] || { total: 0, correct: 0 };
          const wrong = Math.max(0, r.total - r.correct);
          const pct = r.total ? Math.round((r.correct / r.total) * 100) : 0;
          return {
            level,
            total: r.total,
            correct: r.correct,
            wrong,
            pct,
            status: r.total ? (pct >= 70 ? "Aprovado" : "Reprovado") : "Sem questões"
          };
        });

        const validRows = rows.filter(r => r.total > 0);
        const overallScore = validRows.length ? Math.round(validRows.reduce((a, r) => a + r.score, 0) / validRows.length) : 0;
        return { rows, levelRows, overallScore, overallLabel: getScaleLabel(overallScore) };
      }

      function getUserAnswerLines(qRun, ans){
        if (!isQuestionAnswered(qRun, ans)) return ["Sem resposta"];

        if (isDragMatchQuestion(qRun)) {
          return (qRun.targets || []).map(t => {
            const value = ans.dragValues?.[t.id];
            const arr = Array.isArray(value) ? value : (value ? [value] : []);
            const labels = arr.map(id => getDragItemLabel(qRun, id)).filter(Boolean);
            return `${t.label}: ${labels.join(" / ") || "-"}`;
          });
        }

        if (isInlineDropdownQuestion(qRun)) {
          const slots = qRun.inline?.slots || {};
          return Object.keys(slots).map(k => `${slots[k]?.label || k}: ${ans.inlineValues?.[k] || "-"}`);
        }

        if (isDropdownQuestion(qRun)) {
          return (qRun.rows || []).map(row => {
            const parts = (qRun.columns || []).map(col => `${col.label}: ${ans.dropdownValues?.[row.id]?.[col.id] || "-"}`);
            return `${row.label}: ${parts.join(" | ")}`;
          });
        }

        return (ans.chosenKeys || []).map(k => `${k}. ${qRun.mappingFixed?.[k] || "-"}`);
      }

      function renderScaleResults(scale, correct, total){
        if (!scaleResultWrap) return;
        const wrong = Math.max(0, total - correct);
        const levelRowsHtml = (scale.levelRows || []).map(r => `
          <tr>
            <td>${escapeHtml(r.level)}</td>
            <td>${r.total}</td>
            <td>${r.correct}</td>
            <td>${r.wrong}</td>
            <td>${r.pct}%</td>
            <td><strong>${escapeHtml(r.status)}</strong></td>
          </tr>`).join("");
        const rowsHtml = scale.rows.map(r => `
          <tr>
            <td>${escapeHtml(r.skill)}</td>
            <td><strong>${r.score}</strong> — ${escapeHtml(r.label)}</td>
            <td>${r.correct}</td>
            <td>${r.wrong}</td>
            <td>${r.pct}%</td>
          </tr>`).join("");
        scaleResultWrap.innerHTML = `
          <div class="scaleResultSummary">Média Global Scale: ${scale.overallScore} — ${escapeHtml(scale.overallLabel)} | Acertos: ${correct} | Erros: ${wrong}</div>
          <div class="scaleResultSectionTitle">Resultado por nível</div>
          <table>
            <thead>
              <tr><th>Nível</th><th>Questões</th><th>Acertos</th><th>Erros</th><th>% de acerto</th><th>Status</th></tr>
            </thead>
            <tbody>${levelRowsHtml}</tbody>
          </table>
          <div class="scaleResultSectionTitle">Resultado por Skill</div>
          <table>
            <thead>
              <tr><th>Skill</th><th>Nível calculado</th><th>Acertos</th><th>Erros</th><th>Média</th></tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>`;
        show(scaleResultWrap);
      }

      function showResults(timedOutEnded, endedByUser){
        endedByUser = !!endedByUser;
        if (!resultCard.classList.contains("hidden")) return;

        const scoredQuestions = questionsRun.filter(q => !isUnsupportedPlaceholderQuestion(q));
        const excludedCount = questionsRun.length - scoredQuestions.length;
        const total = scoredQuestions.length;

        let answered = 0;
        let correct = 0;
        const wrongIds = [];

        scoredQuestions.forEach(q => {
          const ans = userAnswers.get(q.id);
          const hasAnswer = isQuestionAnswered(q, ans);

          if (hasAnswer) {
            answered++;
            if (ans.isCorrect) correct++;
            else wrongIds.push(q.id);
          } else {
            wrongIds.push(q.id);
          }
        });

        const remaining = Math.max(0, total - answered);
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        const scale = calculateScaleResults(scoredQuestions);

        scorePctEl.textContent = `${scale.overallScore}`;
        scoreDetailEl.textContent =
          `Média: ${scale.overallScore} (${scale.overallLabel}) | ${correct} acertos | ${Math.max(0, total - correct)} erros | ${pct}% de acerto` +
          (excludedCount ? ` | ${excludedCount} excluída(s) do cálculo` : "") +
          (remaining > 0 ? ` | ${answered} respondidas, ${remaining} não respondidas` : "");

        renderScaleResults(scale, correct, total);
        resultTitleEl.textContent = `Resultado — ${runSettings.skillDisplayName || runSettings.examName}`;

        const timeoutPrefix = timedOutEnded ? "⏰ Tempo esgotado. Questões não respondidas foram consideradas erradas.\n" : "";
        const manualPrefix = (!timedOutEnded && endedByUser && remaining > 0) ? "🧾 Teste finalizado. Questões não respondidas foram consideradas erradas.\n" : "";
        passFailMsgEl.textContent = timeoutPrefix + manualPrefix + `Classificação média: ${scale.overallLabel} (${scale.overallScore}).`;
        passFailMsgEl.className = scale.overallScore >= 300 ? "msg ok" : (scale.overallScore >= 100 ? "msg warn" : "msg bad");

        hide(continueBtn);

        wrongListEl.innerHTML = "";
        if (wrongIds.length > 0) {
          show(wrongListWrap);
          wrongIds.forEach(id => {
            const q = questionsRun.find(x => x.id === id);
            const ans = q ? userAnswers.get(q.id) : null;
            const userLines = q ? getUserAnswerLines(q, ans) : ["Sem resposta"];
            const correctLines = q ? getCorrectAnswerLines(q) : [];
            const li = document.createElement("li");
            li.innerHTML = `
              <strong>${escapeHtml(q?.skill || "Skill")} — ${escapeHtml(q?.level || "Nível")}</strong><br>
              ${escapeHtml(q?.prompt || id)}<br>
              <span class="muted">Resposta do usuário: ${escapeHtml(userLines.join(" | "))}</span><br>
              <span>Resposta correta: ${escapeHtml(correctLines.join(" | "))}</span>
            `;
            wrongListEl.appendChild(li);
          });
          show(retryWrongBtn);
          retryWrongBtn.dataset.wrong = JSON.stringify(wrongIds);
        } else {
          hide(wrongListWrap);
          hide(retryWrongBtn);
          retryWrongBtn.dataset.wrong = "[]";
        }

        gotoResult();
      }

      function retryWrong(){
        const ids = JSON.parse(retryWrongBtn.dataset.wrong || "[]");
        const all = getQuestionsBySkillAndLevel(runSettings.selectedSkillIds || [], runSettings.selectedLevels || []);
        const subset = all.filter(q => ids.includes(q.id));
        if (!subset.length) return restartAllKeepingSettings();

        timedOut = false;
        stopTimer();

        userAnswers.clear();
        idx = 0;
        questionsRun = buildRun(subset);
        runSettings.timerSeconds = questionsRun.length * TIMER_SECONDS_PER_QUESTION;
        refreshQuestionJumpOptions();

        startTimerIfEnabled();
        gotoQuiz();
        render();
      }

      function continueAfterTimeout(){
        timedOut = false;
        stopTimer();
        runSettings.timerEnabled = false;
        hide(timerBar);

        gotoQuiz();
        render();
      }

      function restartAllKeepingSettings(){
        timedOut = false;
        stopTimer();

        const selectedQuestions = getQuestionsBySkillAndLevel(runSettings.selectedSkillIds || [], runSettings.selectedLevels || []);
        if (!selectedQuestions.length) {
          gotoMenu();
          updateExamInfo();
          return;
        }

        runSettings.skillDisplayName = runSettings.skillDisplayName || buildSelectionLabel(runSettings.selectedSkillIds || [], runSettings.selectedLevels || []);
        examPill.textContent = `Skill: ${runSettings.skillDisplayName || runSettings.examName}`;
        resultTitleEl.textContent = `Resultado — ${runSettings.skillDisplayName || runSettings.examName}`;
        hide(scaleResultWrap);

        userAnswers.clear();
        idx = 0;
        questionsRun = buildRun(selectedQuestions);
        runSettings.timerSeconds = questionsRun.length * TIMER_SECONDS_PER_QUESTION;
        refreshQuestionJumpOptions();

        startTimerIfEnabled();
        gotoQuiz();
        render();
      }

      optShowFeedback.addEventListener("change", updateDependencies);
      optEnableTimer.addEventListener("change", updateDependencies);
      optExamName.addEventListener("change", updateExamInfo);

      startBtn.addEventListener("click", startRun);
      prevBtn.addEventListener("click", goPrev);
      nextBtn.addEventListener("click", goNext);
      finishBtn.addEventListener("click", finishExam);
      qJumpSel.addEventListener("change", jumpToQuestionFromSelect);

      restartBtn.addEventListener("click", () => { clearMsg(menuMsg); gotoMenu(); updateExamInfo(); });
      backToMenuBtn.addEventListener("click", () => { clearMsg(menuMsg); gotoMenu(); updateExamInfo(); });

      retryAllBtn.addEventListener("click", restartAllKeepingSettings);
      retryWrongBtn.addEventListener("click", retryWrong);
      continueBtn.addEventListener("click", continueAfterTimeout);
      logoutBtnMenu?.addEventListener("click", logoutUser);
      logoutBtnResult?.addEventListener("click", logoutUser);
      managePlanBtnMenu?.addEventListener("click", openBillingPage);
      seePlansBtn?.addEventListener("click", openBillingPage);
      keepFreePlanBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

      settingsTrigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleSettingsMenu();
      });

      settingsDropdown?.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      document.addEventListener("click", () => setSettingsMenuOpen(false));
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setSettingsMenuOpen(false);
        }
      });

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          refreshAccessUiState(true);
        }
      });

      window.addEventListener("focus", () => {
        refreshAccessUiState(true);
      });

      window.addEventListener("pageshow", () => {
        refreshAccessUiState(true);
      });

      window.addEventListener("storage", (event) => {
        if (event.key === "access_profile") {
          refreshAccessUiState(true);
        }
      });

      window.addEventListener("access-profile-updated", () => {
        refreshAccessUiState(true);
      });

      hydrateCurrentUserInfo();
      updateDependencies();

      hide(menuCard); hide(quizCard); hide(resultCard);

      refreshSkillSelectionUi();
      refreshLevelSelectionUi();
      updateExamInfo();
      Promise.resolve(window.__ACCESS_PROFILE_READY__)
        .catch(() => null)
        .finally(() => {
          // Boot completo: app-access.js terminou o fetch ao banco.
          // O perfil em localStorage agora é confiável.
          accessProfileBootPending = false;
          startFreeTimerOnce();        // inicializa o timer com dados reais
          refreshAccessUiState(true);
        });
      if (accessUiRefreshInterval) clearInterval(accessUiRefreshInterval);
      accessUiRefreshInterval = setInterval(() => refreshAccessUiState(false), 1000);
      updateExamInfo();
    

      // ====== Configuração interna de tipos preservada para compatibilidade ======
      const typeDD = document.getElementById('typeDD');
      const typeDDBtn = document.getElementById('typeDDBtn');
      const typeDDMenu = document.getElementById('typeDDMenu');
      const typeDDLabel = document.getElementById('typeDDLabel');

      function getTypeChecks() {
        return {
          all: document.getElementById('optTypeAll'),
          mcq: document.getElementById('optTypeMcq'),
          matrix: document.getElementById('optTypeMatrix'),
          yesno: document.getElementById('optTypeYesNo'),
          yesnoalt: document.getElementById('optTypeYesNoAlt'),
          inline: document.getElementById('optTypeInline'),
          drag: document.getElementById('optTypeDrag'),
          laborio: document.getElementById('optTypeLaborio'),
          unsupported: document.getElementById('optTypeUnsupported')
        };
      }

      function syncTypeAllCheckbox() {
        const c = getTypeChecks();
        const individuals = [c.mcq, c.matrix, c.yesno, c.yesnoalt, c.inline, c.drag, c.laborio, c.unsupported].filter(Boolean);
        if (!c.all) return;
        const checkedCount = individuals.filter(ch => ch.checked).length;
        c.all.checked = checkedCount === individuals.length;
        c.all.indeterminate = checkedCount > 0 && checkedCount < individuals.length;
      }

      function updateTypeDDLabel() {
        const c = getTypeChecks();
        syncTypeAllCheckbox();
        const entries = [
          ['Alternativas', c.mcq?.checked],
          ['Dropdown', c.matrix?.checked],
          ['Sim/Não', c.yesno?.checked],
          ['Yes/No - Alternativa', c.yesnoalt?.checked],
          ['Texto', c.inline?.checked],
          ['Arrastar', c.drag?.checked],
          ['Laboratório', c.laborio?.checked],
          ['Incompatível', c.unsupported?.checked]
        ];
        const selected = entries.filter(e => e[1]).map(e => e[0]);
        if (selected.length === entries.length) {
          typeDDLabel.textContent = 'Todas';
        } else if (selected.length === 0) {
          typeDDLabel.textContent = 'Nenhuma';
        } else if (selected.length <= 2) {
          typeDDLabel.textContent = selected.join(', ');
        } else {
          typeDDLabel.textContent = `${selected.length} selecionadas`;
        }
      }

      function openTypeDD(open) {
        if (!typeDD) return;
        const isOpen = typeDD.classList.contains('open');
        const next = (typeof open === 'boolean') ? open : !isOpen;
        typeDD.classList.toggle('open', next);
        typeDDBtn?.setAttribute('aria-expanded', next ? 'true' : 'false');
      }

      typeDDBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openTypeDD();
      });

      document.addEventListener('click', (e) => {
        if (!typeDD) return;
        if (!typeDD.contains(e.target)) openTypeDD(false);
      });

      const typeChecks = getTypeChecks();
      const individualTypeChecks = [typeChecks.mcq, typeChecks.matrix, typeChecks.yesno, typeChecks.yesnoalt, typeChecks.inline, typeChecks.drag, typeChecks.laborio, typeChecks.unsupported].filter(Boolean);

      typeChecks.all?.addEventListener('change', () => {
        const checked = !!typeChecks.all.checked;
        individualTypeChecks.forEach(ch => {
          ch.checked = checked;
        });
        typeChecks.all.indeterminate = false;
        updateTypeDDLabel();
      });

      individualTypeChecks.forEach(ch => {
        ch.addEventListener('change', () => {
          updateTypeDDLabel();
        });
      });

      updateTypeDDLabel();

});
  
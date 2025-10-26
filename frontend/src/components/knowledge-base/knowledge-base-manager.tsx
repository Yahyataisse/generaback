'use client';

import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    FolderIcon,
    FileIcon,
    PlusIcon,
    TrashIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoreVerticalIcon,
    Brain,
    Network,
    Database,
    Cpu,
    Shield,
    Zap,
    Sparkles,
    BookOpen,
    Upload
} from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensors,
    useSensor,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedTreeItem, FileDragOverlay } from './shared-kb-tree';
import { UnifiedKbEntryModal } from './unified-kb-entry-modal';
import { KBFilePreviewModal } from './kb-file-preview-modal';
import { EditSummaryModal } from './edit-summary-modal';
import { KBDeleteConfirmDialog } from './kb-delete-confirm-dialog';
import { cn } from '@/lib/utils';

// Blockchain 3D Background Component
const Blockchain3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Blockchain Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 transform animate-float"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (Math.sin(i) * 30)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-full h-full border-2 transform rotate-45 transition-all duration-1000 hover:rotate-180 hover:scale-150",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_15px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_15px_#FF00FF]" :
            "border-green-400 shadow-[0_0_15px_#00FF00]"
          )}></div>
        </div>
      ))}

      {/* Data Flow Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Neural Network Lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="animate-pulse">
          <defs>
            <linearGradient id="neural-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${Math.random() * 100} ${Math.random() * 100} 
                  L${Math.random() * 100} ${Math.random() * 100}
                  L${Math.random() * 100} ${Math.random() * 100}`}
              stroke="url(#neural-glow)"
              strokeWidth="0.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// Enhanced Button with Neon Effect
const NeonButton = ({ children, onClick, className, ...props }: any) => (
  <Button
    onClick={onClick}
    className={cn(
      "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] border-0",
      className
    )}
    {...props}
  >
    <Sparkles className="w-4 h-4 mr-2" />
    {children}
  </Button>
);

// Mock Data for Simulation
const MOCK_FOLDERS = [
  {
    folder_id: '1',
    name: 'Research Papers',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    folder_id: '2',
    name: 'Project Documentation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    folder_id: '3',
    name: 'Technical Guides',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const MOCK_ENTRIES = {
  '1': [
    {
      entry_id: '1-1',
      filename: 'ai-research.pdf',
      file_size: 2456789,
      created_at: new Date().toISOString(),
      summary: 'Advanced research on neural networks and machine learning applications'
    },
    {
      entry_id: '1-2',
      filename: 'Artificial_Intelligence-Blockchain.pdf',
      file_size: 1234567,
      created_at: new Date().toISOString(),
      summary: 'Comprehensive study on blockchain technology and its applications'
    }
  ],
  '2': [
    {
      entry_id: '2-1',
      filename: 'Blockchain_For_Beginners_A_EUBOF_Guide.pdf',
      file_size: 3456789,
      created_at: new Date().toISOString(),
      summary: 'Detailed project requirements and specifications document'
    },
    {
      entry_id: '2-2',
      filename: 'My_Life_in_Artificial_Intelligence.pdf',
      file_size: 456789,
      created_at: new Date().toISOString(),
      summary: 'Complete API documentation with examples and usage guidelines'
    }
  ],
  '3': [
    {
      entry_id: '3-1',
      filename: 'Blockchain_For_Beginners_A_EUBOF_Guide.pdf',
      file_size: 1567890,
      created_at: new Date().toISOString(),
      summary: 'Step-by-step setup and installation guide'
    }
  ]
};

const MOCK_RECENT_FILES = [
  {
    entry_id: '1-1',
    filename: 'ai-research.pdf',
    created_at: new Date().toISOString(),
    fileUrl: '/files/ai-research.pdf' // ← رابط محلي
  },
  {
    entry_id: '2-1',
    filename: 'Artificial_Intelligence-Blockchain.pdf',
    created_at: new Date().toISOString(),
    fileUrl: '/files/Artificial_Intelligence-Blockchain.pdf'
  },
  {
    entry_id: '3-1',
    filename: 'Blockchain_For_Beginners_A_EUBOF_Guide.pdf',
    created_at: new Date().toISOString(),
    fileUrl: '/files/Blockchain_For_Beginners_A_EUBOF_Guide.pdf'
  },
  {
    entry_id: '1-2',
    filename: 'My_Life_in_Artificial_Intelligence.pdf',
    created_at: new Date().toISOString(),
    fileUrl: '/files/My_Life_in_Artificial_Intelligence.pdf'
  }
];

interface TreeItem {
    id: string;
    type: 'folder' | 'file';
    name: string;
    parentId?: string;
    data?: any;
    children?: TreeItem[];
    expanded?: boolean;
}

interface KnowledgeBaseManagerProps {
    agentId?: string;
    agentName?: string;
    showHeader?: boolean;
    headerTitle?: string;
    headerDescription?: string;
    showRecentFiles?: boolean;
    emptyStateMessage?: string;
    emptyStateContent?: React.ReactNode;
    maxHeight?: string;
    enableAssignments?: boolean;
}

export function KnowledgeBaseManager({
    agentId,
    agentName,
    showHeader = true,
    headerTitle = "Data Base",
    headerDescription = "Organize documents and files for AI agents to search and reference",
    showRecentFiles = true,
    emptyStateMessage,
    emptyStateContent,
    maxHeight,
    enableAssignments = false
}: KnowledgeBaseManagerProps) {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);
    const [folderEntries, setFolderEntries] = useState<{ [folderId: string]: any[] }>({});
    const [loadingFolders, setLoadingFolders] = useState<{ [folderId: string]: boolean }>({});
    const [movingFiles, setMovingFiles] = useState<{ [fileId: string]: boolean }>({});
    const [selectedItem, setSelectedItem] = useState<TreeItem | null>(null);
    const [editingFolder, setEditingFolder] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    // Assignment state for agent mode
    const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
    const [assignmentsLoading, setAssignmentsLoading] = useState(false);

    // Modal states
    const [deleteConfirm, setDeleteConfirm] = useState<{
        isOpen: boolean;
        item: { id: string; name: string; type: 'folder' | 'file' } | null;
        isDeleting: boolean;
    }>({
        isOpen: false,
        item: null,
        isDeleting: false,
    });

    const [uploadStatus, setUploadStatus] = useState<{
        [folderId: string]: {
            isUploading: boolean;
            progress: number;
            currentFile?: string;
            totalFiles?: number;
            completedFiles?: number;
        };
    }>({});

    const [editSummaryModal, setEditSummaryModal] = useState<{
        isOpen: boolean;
        fileId: string;
        fileName: string;
        currentSummary: string;
    }>({
        isOpen: false,
        fileId: '',
        fileName: '',
        currentSummary: '',
    });

    const [filePreviewModal, setFilePreviewModal] = useState<{
        isOpen: boolean;
        file: any;
    }>({
        isOpen: false,
        file: null,
    });

    const [showNewAgentDialog, setShowNewAgentDialog] = useState(false);

    // Mock data instead of API calls
    const folders = MOCK_FOLDERS;
    const recentFiles = MOCK_RECENT_FILES;
    const foldersLoading = false;

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Build tree structure with mock data
    React.useEffect(() => {
        const buildTree = () => {
            const tree: TreeItem[] = folders.map(folder => {
                const existingFolder = treeData.find(item => item.id === folder.folder_id);
                const isExpanded = enableAssignments ? true : (existingFolder?.expanded || false);

                return {
                    id: folder.folder_id,
                    type: 'folder' as const,
                    name: folder.name,
                    data: folder,
                    children: MOCK_ENTRIES[folder.folder_id as keyof typeof MOCK_ENTRIES]?.map(entry => ({
                        id: entry.entry_id,
                        type: 'file' as const,
                        name: entry.filename,
                        parentId: folder.folder_id,
                        data: entry,
                    })) || [],
                    expanded: isExpanded,
                };
            });
            setTreeData(tree);
        };

        buildTree();
    }, [folders, enableAssignments]);

    // Mock assignment loading
    React.useEffect(() => {
        if (enableAssignments && agentId) {
            setAssignmentsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                const mockSelected = new Set(['1-1', '2-1', '3-1']);
                setSelectedEntries(mockSelected);
                setAssignmentsLoading(false);
                toast.success('Assignments loaded successfully');
            }, 1000);
        }
    }, [enableAssignments, agentId]);

    // Mock functions that simulate successful operations
    const handleFileSelect = (item: TreeItem) => {
        if (item.type === 'file' && item.data) {
            setFilePreviewModal({
                isOpen: true,
                file: item.data,
            });
        } else {
            setSelectedItem(item);
        }
    };

    const handleExpand = async (folderId: string) => {
        const folder = treeData.find(item => item.id === folderId);
        const isCurrentlyExpanded = folder?.expanded;

        setTreeData(prev =>
            prev.map(item =>
                item.id === folderId
                    ? { ...item, expanded: !item.expanded }
                    : item
            )
        );

        // Simulate loading
        setLoadingFolders(prev => ({ ...prev, [folderId]: true }));
        setTimeout(() => {
            setLoadingFolders(prev => ({ ...prev, [folderId]: false }));
        }, 500);
    };

    // Mock assignment functions
    const toggleEntrySelection = async (entryId: string) => {
        const newSelection = new Set(selectedEntries);
        if (newSelection.has(entryId)) {
            newSelection.delete(entryId);
        } else {
            newSelection.add(entryId);
        }
        setSelectedEntries(newSelection);
        
        // Simulate successful save
        toast.success('Assignment updated successfully');
    };

    const toggleFolderSelection = async (folderId: string) => {
        const folder = treeData.find(f => f.id === folderId);
        if (!folder?.children) return;

        const folderEntryIds = folder.children.map(child => child.id);
        const allSelected = folderEntryIds.every(id => selectedEntries.has(id));

        const newSelection = new Set(selectedEntries);

        if (allSelected) {
            folderEntryIds.forEach(id => newSelection.delete(id));
        } else {
            folderEntryIds.forEach(id => newSelection.add(id));
        }

        setSelectedEntries(newSelection);
        toast.success('Folder assignment updated successfully');
    };

    // Mock edit functions
    const handleStartEdit = (folderId: string, currentName: string) => {
        setEditingFolder(folderId);
        setEditingName(currentName);
        setValidationError(null);
        setTimeout(() => {
            editInputRef.current?.focus();
            editInputRef.current?.select();
        }, 0);
    };

    const handleEditChange = (newName: string) => {
        setEditingName(newName);
        // Simple validation
        if (newName.trim().length === 0) {
            setValidationError('Folder name cannot be empty');
        } else if (newName.length > 50) {
            setValidationError('Folder name too long');
        } else {
            setValidationError(null);
        }
    };

    const handleFinishEdit = async () => {
        if (!editingFolder || !editingName.trim() || validationError) {
            setEditingFolder(null);
            return;
        }

        // Simulate successful rename
        toast.success('Folder renamed successfully');
        setEditingFolder(null);
        setEditingName('');
        setValidationError(null);
    };

    const handleEditKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleFinishEdit();
        } else if (e.key === 'Escape') {
            setEditingFolder(null);
            setEditingName('');
            setValidationError(null);
        }
    };

    const handleEditSummary = (fileId: string, fileName: string, currentSummary: string) => {
        setEditSummaryModal({
            isOpen: true,
            fileId,
            fileName,
            currentSummary,
        });
    };

    const handleSaveSummary = async (newSummary: string) => {
        // Simulate successful save
        toast.success('Summary updated successfully');
        setEditSummaryModal({
            isOpen: false,
            fileId: '',
            fileName: '',
            currentSummary: '',
        });
    };

    const handleDelete = (id: string, type: 'folder' | 'file') => {
        const item = treeData.flatMap(folder => [folder, ...(folder.children || [])])
            .find(item => item.id === id);

        if (!item) return;

        setDeleteConfirm({
            isOpen: true,
            item: { id, name: item.name, type },
            isDeleting: false,
        });
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.item) return;

        const { id, type } = deleteConfirm.item;
        setDeleteConfirm(prev => ({ ...prev, isDeleting: true }));

        // Simulate deletion delay
        setTimeout(() => {
            toast.success(`${type === 'folder' ? 'Folder' : 'File'} deleted successfully`);
            setDeleteConfirm({
                isOpen: false,
                item: null,
                isDeleting: false,
            });
        }, 1000);
    };

    const handleMoveFile = async (fileId: string, targetFolderId: string) => {
        setMovingFiles(prev => ({ ...prev, [fileId]: true }));

        // Simulate move operation
        setTimeout(() => {
            toast.success('File moved successfully');
            setMovingFiles(prev => ({ ...prev, [fileId]: false }));
        }, 800);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        const activeItemId = active.id.toString();
        const overItemId = over.id.toString().replace('droppable-', '');

        const activeItem = treeData.flatMap(folder => [folder, ...(folder.children || [])]).find(item => item.id === activeItemId);
        const overItem = treeData.flatMap(folder => [folder, ...(folder.children || [])]).find(item => item.id === overItemId);

        if (!activeItem || !overItem) {
            setActiveId(null);
            return;
        }

        if (activeItem.type === 'file' && overItem.type === 'folder') {
            handleMoveFile(activeItem.id, overItem.id);
        }

        setActiveId(null);
    };

    // Mock file upload
    const handleNativeFileDrop = async (files: FileList, folderId: string) => {
        const fileArray = Array.from(files);
        const totalFiles = fileArray.length;

        setUploadStatus(prev => ({
            ...prev,
            [folderId]: {
                isUploading: true,
                progress: 0,
                totalFiles,
                completedFiles: 0,
                currentFile: fileArray[0]?.name
            }
        }));

        // Simulate upload progress
        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            
            // Update progress
            setUploadStatus(prev => ({
                ...prev,
                [folderId]: {
                    ...prev[folderId],
                    currentFile: file.name,
                    progress: ((i + 1) / totalFiles) * 100,
                    completedFiles: i + 1
                }
            }));

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Complete upload
        setTimeout(() => {
            setUploadStatus(prev => {
                const newStatus = { ...prev };
                delete newStatus[folderId];
                return newStatus;
            });
            toast.success(`Successfully uploaded ${totalFiles} file(s)`);
        }, 500);
    };

    // Format date helper
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getFileTypeInfo = (filename: string) => {
        const extension = filename.split('.').pop()?.toLowerCase() || '';
        const fileType = extension.toUpperCase();

        return {
            extension: fileType,
            colorClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
        };
    };

    const getFolderSelectionState = (folderId: string) => {
        const folder = treeData.find(f => f.id === folderId);
        if (!folder?.children || folder.children.length === 0) {
            return { selected: false, indeterminate: false };
        }

        const folderEntryIds = folder.children.map(child => child.id);
        const selectedCount = folderEntryIds.filter(id => selectedEntries.has(id)).length;

        if (selectedCount === 0) {
            return { selected: false, indeterminate: false };
        } else if (selectedCount === folderEntryIds.length) {
            return { selected: true, indeterminate: false };
        } else {
            return { selected: false, indeterminate: true };
        }
    };

    if (foldersLoading || (enableAssignments && assignmentsLoading)) {
        return (
            <div className="space-y-4 relative">
                <Blockchain3DBackground />
                
                {showHeader && (
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                    </div>
                )}
                <div className="space-y-3 relative z-10">
                    {/* Loading skeletons */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-cyan-400/20 bg-black/40 backdrop-blur-sm">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            {enableAssignments && <Skeleton className="h-5 w-9 rounded-full" />}
                            <Skeleton className="h-6 w-6" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const defaultEmptyMessage = enableAssignments 
        ? `No data base content available. Create folders and upload files to provide ${agentName} with searchable Data.`
        : "Start building your data base by creating folders and uploading files.";

    // Build assignments for assignment mode
    const allAssignments: { [id: string]: boolean } = {};
    const allIndeterminateStates: { [id: string]: boolean } = {};

    if (enableAssignments) {
        treeData.forEach(folder => {
            if (folder.children) {
                folder.children.forEach(child => {
                    allAssignments[child.id] = selectedEntries.has(child.id);
                });
            }
        });

        treeData.forEach(folder => {
            const folderState = getFolderSelectionState(folder.id);
            allAssignments[folder.id] = folderState.selected;
            if (folderState.indeterminate) {
                allIndeterminateStates[folder.id] = true;
            }
        });
    }

    return (
        <div className="space-y-4 relative">
            {/* Blockchain Background */}
            <Blockchain3DBackground />
            
            {/* Header Section */}
            {showHeader && (
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                            {headerTitle}
                        </h3>
                        <p className="text-sm text-cyan-200/60 mt-2">
                            {enableAssignments ? `Manage ${agentName}'s Data sources and access` : headerDescription}
                        </p>
                    </div>
                    <NeonButton 
                        size="sm" 
                        className="gap-2"
                        onClick={() => toast.success('Add Data feature activated')}
                    >
                        <PlusIcon className="h-4 w-4" />
                        Add Data
                    </NeonButton>
                </div>
            )}

           {/* Recent Files Section */}
{/* Recent Files Section */}
{showRecentFiles && recentFiles.length > 0 && (
  <div className="mb-8 relative z-10">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-medium text-cyan-300">
        Recently Added
      </h3>
      <span className="text-xs text-cyan-200/60">
        {recentFiles.length} files
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      {recentFiles.slice(0, 6).map((file) => {
        const fileInfo = getFileTypeInfo(file.filename);
        
        // دالة لفتح الملف محلياً
        const handleFileClick = () => {
          if (file.fileUrl) {
            // فتح الملف في نافذة جديدة
            window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
            toast.success(`Opening ${file.filename}`);
          } else {
            // إذا لم يوجد رابط، افتح المعاينة
            setFilePreviewModal({
              isOpen: true,
              file: file,
            });
          }
        };

        return (
          <div
            key={file.entry_id}
            className="group cursor-pointer"
            onClick={handleFileClick}
          >
            <div className="relative bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-400/30">
                    <FileIcon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-black border border-cyan-400/30 rounded px-1 py-0.5">
                    <span className="text-[8px] font-medium text-cyan-300 uppercase">
                      {fileInfo.extension.slice(0, 3)}
                    </span>
                  </div>
                  
                  {/* أيقونة فتح الملف */}
                  {file.fileUrl && (
                    <div className="absolute -top-1 -left-1 bg-green-500 rounded-full p-1">
                      <BookOpen className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-center space-y-1 w-full">
                  <p className="text-xs font-medium text-cyan-100 truncate" title={file.filename}>
                    {file.filename.length > 12 ? `${file.filename.slice(0, 12)}...` : file.filename}
                  </p>
                  <p className="text-xs text-cyan-200/60">
                    {formatDate(file.created_at)}
                  </p>
                  
                  {/* إشارة إلى الملف المحلي */}
                  {file.fileUrl && (
                    <p className="text-[10px] text-green-400 font-medium">
                      Open File
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

            {/* Main Content */}
            <div 
                className="space-y-4 relative z-10"
                style={{ maxHeight }}
            >
                {treeData.length === 0 ? (
                    emptyStateContent ? emptyStateContent : (
                        <div className="text-center py-12 px-6 bg-black/40 backdrop-blur-sm rounded-xl border-2 border-dashed border-cyan-400/20">
                            <div className="mx-auto w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 border border-cyan-400/30">
                                <FolderIcon className="h-6 w-6 text-cyan-300" />
                            </div>
                            <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                                {enableAssignments ? "No knowledge base content available" : "Start Building Your Knowledge Base"}
                            </h4>
                            <p className="text-sm text-cyan-200/60 mb-6 max-w-sm mx-auto">
                                {emptyStateMessage || defaultEmptyMessage}
                            </p>
                            <NeonButton 
                                size="sm" 
                                className="gap-2"
                                onClick={() => toast.success('Knowledge base creation started')}
                            >
                                <PlusIcon className="h-4 w-4" />
                                Add Data
                            </NeonButton>
                        </div>
                    )
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={[]}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3">
                                {treeData.map((item) => (
                                    <SharedTreeItem
                                        key={item.id}
                                        item={item}
                                        onExpand={handleExpand}
                                        onSelect={handleFileSelect}
                                        enableDnd={true}
                                        enableActions={true}
                                        enableEdit={!enableAssignments}
                                        enableAssignment={enableAssignments}
                                        assignments={enableAssignments ? allAssignments : undefined}
                                        assignmentIndeterminate={enableAssignments ? allIndeterminateStates : undefined}
                                        onToggleAssignment={enableAssignments ? (id) => {
                                            const targetItem = treeData.find(f => f.id === id) ||
                                                treeData.flatMap(f => f.children || []).find(c => c.id === id);
                                            if (targetItem?.type === 'folder') {
                                                toggleFolderSelection(id);
                                            } else {
                                                toggleEntrySelection(id);
                                            }
                                        } : undefined}
                                        onDelete={handleDelete}
                                        onEditSummary={handleEditSummary}
                                        editingFolder={editingFolder}
                                        editingName={editingName}
                                        onStartEdit={handleStartEdit}
                                        onFinishEdit={handleFinishEdit}
                                        onEditChange={handleEditChange}
                                        onEditKeyPress={handleEditKeyPress}
                                        editInputRef={editInputRef}
                                        onNativeFileDrop={handleNativeFileDrop}
                                        uploadStatus={uploadStatus[item.id]}
                                        validationError={editingFolder === item.id ? validationError : null}
                                        isLoadingEntries={loadingFolders[item.id]}
                                        movingFiles={movingFiles}
                                    />
                                ))}
                            </div>
                        </SortableContext>

                        <DragOverlay>
                            {activeId ? (() => {
                                const findActiveItem = (items: TreeItem[]): TreeItem | null => {
                                    for (const item of items) {
                                        if (item.id === activeId) return item;
                                        if (item.children) {
                                            const found = findActiveItem(item.children);
                                            if (found) return found;
                                        }
                                    }
                                    return null;
                                };

                                const activeItem = findActiveItem(treeData);

                                if (activeItem?.type === 'file') {
                                    return <FileDragOverlay item={activeItem} />;
                                } else {
                                    return (
                                        <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/50 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <FolderIcon className="h-4 w-4 text-cyan-300" />
                                                <span className="font-medium text-sm text-cyan-100">
                                                    {activeItem?.name}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            })() : null}
                        </DragOverlay>
                    </DndContext>
                )}
            </div>

            {/* Modals */}
            <KBDeleteConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, item: null, isDeleting: false })}
                onConfirm={confirmDelete}
                itemName={deleteConfirm.item?.name || ''}
                itemType={deleteConfirm.item?.type || 'file'}
                isDeleting={deleteConfirm.isDeleting}
            />

            <EditSummaryModal
                isOpen={editSummaryModal.isOpen}
                onClose={() => setEditSummaryModal({ isOpen: false, fileId: '', fileName: '', currentSummary: '' })}
                fileName={editSummaryModal.fileName}
                currentSummary={editSummaryModal.currentSummary}
                onSave={handleSaveSummary}
            />

            {filePreviewModal.file && (
                <KBFilePreviewModal
                    isOpen={filePreviewModal.isOpen}
                    onClose={() => setFilePreviewModal({ isOpen: false, file: null })}
                    file={filePreviewModal.file}
                    onEditSummary={handleEditSummary}
                />
            )}
        </div>
    );
}

// Global styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg) scale(1); 
    }
    33% { 
      transform: translateY(-15px) rotate(120deg) scale(1.05); 
    }
    66% { 
      transform: translateY(-8px) rotate(240deg) scale(0.95); 
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}